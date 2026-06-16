const multiButton = document.getElementById("multiCheckButton");
const multiResult = document.getElementById("result");

function cloneRngState() {
  return { x, y, z, w, t, f, r0, r1, r2, r3, r4, r5, r6 };
}

function restoreRngState(state) {
  x = state.x;
  y = state.y;
  z = state.z;
  w = state.w;
  t = state.t;
  f = state.f;
  r0 = state.r0;
  r1 = state.r1;
  r2 = state.r2;
  r3 = state.r3;
  r4 = state.r4;
  r5 = state.r5;
  r6 = state.r6;
}

function getCharmAtFrame(frame, originIndex) {
  init();

  for (let i = 0; i < frame + 7; i++) {
    roll();
  }

  return getCharm(originIndex);
}

function moveRng(offset) {
  if (offset > 0) {
    for (let i = 0; i < offset; i++) {
      roll();
    }
  } else if (offset < 0) {
    for (let i = 0; i < Math.abs(offset); i++) {
      descend();
    }
  }
}

function isNormalCharmHit(c, param) {
  const [_id1, _sp1, _id2, _sp2, _slot] = param;

  const targetSkill1 = currentTable.skill1[_id1];
  const targetSkill2 = _id2 === null ? null : currentTable.skill2[_id2];

  if (_id2 === null) {
    return (
      c[0] === targetSkill1 &&
      c[1] === _sp1 &&
      c[2] === null &&
      c[4] === _slot
    );
  }

  return (
    c[0] === targetSkill1 &&
    c[1] === _sp1 &&
    c[2] === targetSkill2 &&
    c[3] === _sp2 &&
    c[4] === _slot
  );
}

async function searchMultiCharmsAsync(charm1Param, charm2Param, maxFrames, originIndex, onProgress) {
  init();

  const foundList = [];
  const chunkSize = 100000;

  for (let i = 0; i < maxFrames; i++) {
    roll();

    const c1 = getCharm(originIndex);
    const firstFrame = f - 7;

    if (isNormalCharmHit(c1, charm1Param)) {
      const savedState = cloneRngState();

      for (let offset = -10; offset <= 10; offset++) {
        if (offset === 0) continue;

        const checkFrame = firstFrame + offset;
        if (checkFrame < 0) continue;

        restoreRngState(savedState);
        moveRng(offset);
        const c2 = getCharm(originIndex);

        if (isNormalCharmHit(c2, charm2Param)) {
          foundList.push({
            first: {
              frame: firstFrame,
              watch: watch(firstFrame),
              charm: c1
            },
            second: {
              frame: checkFrame,
              offset,
              charm: c2
            }
          });

          break;
        }
      }

      restoreRngState(savedState);

      if (foundList.length >= 5) {
        break;
      }
    }

    if (i > 0 && i % chunkSize === 0) {
      if (onProgress) {
        onProgress(i, maxFrames);
      }

      await new Promise(requestAnimationFrame);
    }
  }

  if (onProgress) {
    onProgress(Math.min(maxFrames, maxFrames), maxFrames);
  }

  return foundList;
}

if (multiButton) {
  multiButton.addEventListener("click", async () => {
    const status = document.getElementById("searchStatus");

    multiResult.textContent = "";
    status.textContent = "検索中...";

    await new Promise(requestAnimationFrame);

    setTable("blue"); // まずは風化したお守り固定

    const maxFrames = Number(document.getElementById("maxFrames").value);
    const originType = document.querySelector('input[name="originType"]:checked').value;
    const originIndex = origin.indexOf(originType);

    try {
      const charm1Param = parameter(
        document.getElementById("skill1_1").value.trim(),
        Number(document.getElementById("skill1Value_1").value),
        document.getElementById("skill2_1").value.trim(),
        Number(document.getElementById("skill2Value_1").value || 0),
        Number(document.getElementById("slot_1").value),
        originType,
        "normal"
      );

      const charm2Param = parameter(
        document.getElementById("skill1_2").value.trim(),
        Number(document.getElementById("skill1Value_2").value),
        document.getElementById("skill2_2").value.trim(),
        Number(document.getElementById("skill2Value_2").value || 0),
        Number(document.getElementById("slot_2").value),
        originType,
        "normal"
      );

      const startTime = performance.now();

      const foundList = await searchMultiCharmsAsync(
        charm1Param,
        charm2Param,
        maxFrames,
        originIndex,
        (done, total) => {
          const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
          status.textContent = `検索中... ${done}/${total} (${elapsed}秒)`;
        }
      );

      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      status.textContent = `検索完了 (${elapsed}秒)`;

      if (foundList.length === 0) {
        multiResult.textContent =
          `見つかりませんでした。検索範囲: 0 ～ ${maxFrames - 1} frame`;
        return;
      }

      const resultHtml = foundList.map((found, idx) => {
        return `
          <div style="margin-top:16px; padding-top:12px; border-top:1px solid #ccc;">
            <div><strong>${idx + 1}件目</strong></div>

            <div style="margin-top:8px;">
              <strong>第一護石</strong><br>
              frame:
              <a href="${buildDetailUrl(found.first.frame, "blue", originType)}">${found.first.frame}</a>
              / ${escapeHtml(found.first.watch)}<br>
              ${escapeHtml(formatCharmSummary(found.first.charm))}
            </div>

            <div style="margin-top:8px;">
              <strong>第二護石</strong><br>
              frame:
              <a href="${buildDetailUrl(found.second.frame, "blue", originType)}">${found.second.frame}</a>
              / ${escapeHtml(watch(found.second.frame))}<br>
              第一護石から ${found.second.offset > 0 ? "+" : ""}${found.second.offset} フレーム<br>
              ${escapeHtml(formatCharmSummary(found.second.charm))}
            </div>
          </div>
        `;
      }).join("");

      multiResult.innerHTML = `
        <div>複数護石検索ヒット: ${foundList.length}件表示</div>
        ${resultHtml}
      `;
    } catch (error) {
      status.textContent = "";
      multiResult.textContent = `エラー: ${error.message}`;
      console.error(error);
    }
  });
}
