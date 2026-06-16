const multiButton = document.getElementById("multiCheckButton");
const multiResult = document.getElementById("result");

function getCharmAtFrame(frame, originIndex) {
  init();

  for (let i = 0; i < frame + 7; i++) {
    roll();
  }

  return getCharm(originIndex);
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

      const firstResults = await searchFramesByCharmAsync(
        charm1Param,
        0,
        maxFrames,
        100000,
        (done, total) => {
          status.textContent = `第一護石を検索中... ${done}/${total}`;
        },
        "normal",
        []
      );

      if (firstResults.length === 0) {
        status.textContent = "検索完了";
        multiResult.textContent = "第一護石が見つかりませんでした";
        return;
      }

      const foundList = [];

      for (const first of firstResults) {
        for (let offset = -10; offset <= 10; offset++) {
          if (offset === 0) continue;

          const checkFrame = first.frame + offset;
          if (checkFrame < 0) continue;

          const c2 = getCharmAtFrame(checkFrame, originIndex);

          if (isNormalCharmHit(c2, charm2Param)) {
            foundList.push({
              first,
              second: {
                frame: checkFrame,
                offset,
                charm: c2
              }
            });

            if (foundList.length >= 5) break;
          }
        }

        if (foundList.length >= 5) break;
      }

      status.textContent = "検索完了";

      if (foundList.length === 0) {
        multiResult.textContent =
          `第一護石は ${firstResults.length} 件見つかりましたが、前後10フレーム以内に第二護石は見つかりませんでした。`;
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
        <div>第一護石ヒット件数: ${firstResults.length}件</div>
        ${resultHtml}
      `;
    } catch (error) {
      status.textContent = "";
      multiResult.textContent = `エラー: ${error.message}`;
      console.error(error);
    }
  });
}
