const godCharmButton = document.getElementById("godCharmSearchButton");
const godCharmResult = document.getElementById("result");

const GOD_CHARM_SEARCH_FRAMES = 54000; // 30分 = 30分 * 60秒 * 30fps

const targetSkillNames = [
  { id: "sharpnessValue", name: "斬味" },
  { id: "weaknessValue", name: "痛撃" },
  { id: "chainValue", name: "連撃" },
  { id: "criticalValue", name: "会心" },
  { id: "spiritValue", name: "闘魂" },
  { id: "expertValue", name: "達人" },
  { id: "attackValue", name: "攻撃" },
  { id: "sheatheValue", name: "納刀" }
];

const excludeSkillNames = [
  { id: "excludeSharpnessValue", name: "斬味" },
  { id: "excludeWeaknessValue", name: "痛撃" },
  { id: "excludeChainValue", name: "連撃" },
  { id: "excludeCriticalValue", name: "会心" },
  { id: "excludeSpiritValue", name: "闘魂" },
  { id: "excludeExpertValue", name: "達人" },
  { id: "excludeAttackValue", name: "攻撃" },
  { id: "excludeSheatheValue", name: "納刀" }
];

function getSkillIdByName(name) {
  return skill.findIndex(s => s.trim() === name);
}

function getTargetSkillConditions() {
  return targetSkillNames
    .map(item => {
      const value = Number(document.getElementById(item.id).value || 0);
      const skillId = getSkillIdByName(item.name);

      return {
        name: item.name,
        skillId,
        value
      };
    })
    .filter(item => item.skillId !== -1 && item.value > 0);
}

function getExcludeSkillConditions() {
  return excludeSkillNames
    .map(item => {
      const value = Number(document.getElementById(item.id).value || 0);
      const skillId = getSkillIdByName(item.name);

      return {
        name: item.name,
        skillId,
        value
      };
    })
    .filter(item => item.skillId !== -1 && item.value > 0);
}

function hasExcludedLowSkill(c, excludeConditions) {
  const charmSkills = [
    { skillId: c[0], value: c[1] },
    { skillId: c[2], value: c[3] }
  ];

  return excludeConditions.some(condition => {
    return charmSkills.some(charmSkill => {
      return (
        charmSkill.skillId === condition.skillId &&
        charmSkill.value <= condition.value
      );
    });
  });
}

function isGodCharmHit(c, conditions, excludeConditions, slotValue) {
  if (c[4] !== slotValue) return false;

  // 第二スキルなしは除外
  if (c[2] === null) return false;

  const targetSkillIds = conditions.map(condition => condition.skillId);

  const skill1Id = c[0];
  const skill2Id = c[2];

  // 第一・第二スキルが両方とも8スキル内でなければ除外
  if (!targetSkillIds.includes(skill1Id)) return false;
  if (!targetSkillIds.includes(skill2Id)) return false;

  // 除外値以下のスキルを含む場合は除外
  if (hasExcludedLowSkill(c, excludeConditions)) return false;

  const charmSkills = [
    { skillId: skill1Id, value: c[1] },
    { skillId: skill2Id, value: c[3] }
  ];

  // OR検索：どちらかのスキルが入力値以上ならヒット
  return conditions.some(condition => {
    return charmSkills.some(charmSkill => {
      return (
        charmSkill.skillId === condition.skillId &&
        charmSkill.value >= condition.value
      );
    });
  });
}

async function searchGodCharmsAsync(
  startFrame,
  originIndex,
  conditions,
  excludeConditions,
  slotValue,
  onProgress
) {
  init();

  const results = [];
  const endFrame = startFrame + GOD_CHARM_SEARCH_FRAMES;
  const chunkSize = 3000;

  // startFrame の位置まで進める
  for (let i = 0; i < startFrame + 7; i++) {
    roll();
  }

  for (let frame = startFrame; frame < endFrame; frame++) {
    const c = getCharm(originIndex);

    if (isGodCharmHit(c, conditions, excludeConditions, slotValue)) {
      results.push({
        frame,
        watch: watch(frame),
        charm: c
      });
    }

    roll();

    if ((frame - startFrame) % chunkSize === 0) {
      if (onProgress) {
        onProgress(frame - startFrame, GOD_CHARM_SEARCH_FRAMES);
      }

      await new Promise(requestAnimationFrame);
    }
  }

  if (onProgress) {
    onProgress(GOD_CHARM_SEARCH_FRAMES, GOD_CHARM_SEARCH_FRAMES);
  }

  return results;
}

if (godCharmButton) {
  godCharmButton.addEventListener("click", async () => {
    const status = document.getElementById("searchStatus");

    godCharmResult.textContent = "";
    status.textContent = "検索中...";

    await new Promise(requestAnimationFrame);

    setTable("blue"); // 風化したお守り固定

    const startFrame = Number(document.getElementById("startFrame").value || 0);
    const originType = document.querySelector('input[name="originType"]:checked').value;
    const originIndex = origin.indexOf(originType);
    const slotValue = Number(document.getElementById("slotValue").value);

    const conditions = getTargetSkillConditions();
    const excludeConditions = getExcludeSkillConditions();

    if (conditions.length === 0) {
      status.textContent = "";
      godCharmResult.textContent = "検索条件がありません。どれか1つ以上のスキル値を入力してください。";
      return;
    }

    const startTime = performance.now();

    try {
      const results = await searchGodCharmsAsync(
        startFrame,
        originIndex,
        conditions,
        excludeConditions,
        slotValue,
        (done, total) => {
          const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
          status.textContent = `検索中... ${done}/${total} (${elapsed}秒)`;
        }
      );

      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      status.textContent = `検索完了 (${elapsed}秒)`;

      if (results.length === 0) {
        godCharmResult.textContent =
          `見つかりませんでした。\n検索範囲: ${startFrame} ～ ${startFrame + GOD_CHARM_SEARCH_FRAMES - 1} frame`;
        return;
      }

      const resultHtml = results.map((r, idx) => {
        const url = buildDetailUrl(r.frame, "blue", originType);

        return `
          <div style="margin-top:12px; padding-top:10px; border-top:1px solid #ccc;">
            <div>
              ${idx + 1}. frame:
              <a href="${url}">${r.frame}</a>
              / ${escapeHtml(r.watch)}
            </div>
            <div style="margin-top:4px;">
              ${escapeHtml(formatCharmSummary(r.charm))}
            </div>
          </div>
        `;
      }).join("");

      godCharmResult.innerHTML = `
        <div>ヒット件数: ${results.length}件</div>
        <div>検索範囲: ${startFrame} ～ ${startFrame + GOD_CHARM_SEARCH_FRAMES - 1} frame</div>
        <div>抽選元: ${escapeHtml(originType)}</div>
        <div>スロット: S${slotValue}</div>
        ${resultHtml}
      `;
    } catch (error) {
      status.textContent = "";
      godCharmResult.textContent = `エラー: ${error.message}`;
      console.error(error);
    }
  });
}
