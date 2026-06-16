const multiButton = document.getElementById("multiCheckButton");
const multiResult = document.getElementById("result");

if (multiButton) {
  multiButton.addEventListener("click", async () => {
    const skill1Name = document.getElementById("skill1_1").value.trim();
    const skill1Value = document.getElementById("skill1Value_1").value;
    const skill2Name = document.getElementById("skill2_1").value.trim();
    const skill2Value = document.getElementById("skill2Value_1").value;
    const slot = document.getElementById("slot_1").value;

    const maxFrames = Number(document.getElementById("maxFrames").value);
    const originType = document.querySelector('input[name="originType"]:checked').value;

    const status = document.getElementById("searchStatus");

    status.textContent = "検索中...";
    multiResult.textContent = "";

    await new Promise(requestAnimationFrame);

    setTable("blue"); // まずは風化したお守り固定

    try {
      const p = parameter(
        skill1Name,
        Number(skill1Value),
        skill2Name,
        skill2Value === "" ? 0 : Number(skill2Value),
        Number(slot),
        originType,
        "normal"
      );

      const results = await searchFramesByCharmAsync(
        p,
        0,
        maxFrames,
        100000,
        (done, total) => {
          status.textContent = `検索中... ${done}/${total}`;
        },
        "normal",
        []
      );

      status.textContent = "検索完了";

      if (results.length === 0) {
        multiResult.textContent = "見つかりませんでした";
        return;
      }

      const first = results[0];

      multiResult.innerHTML = `
        <div>ヒット件数: ${results.length}</div>
        <div>最初の1件:</div>
        <div>
          frame:
          <a href="${buildDetailUrl(first.frame, "blue", originType)}">${first.frame}</a>
          / ${escapeHtml(first.watch)}
        </div>
        <div style="margin-top:8px;">
          ${escapeHtml(formatCharmSummary(first.charm))}
        </div>
      `;
    } catch (error) {
      status.textContent = "";
      multiResult.textContent = `エラー: ${error.message}`;
      console.error(error);
    }
  });
}
