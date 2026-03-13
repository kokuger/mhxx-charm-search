const button = document.getElementById("checkButton");
const result = document.getElementById("result");
const skill1ValueSelect = document.getElementById("skill1Value");
const skill2ValueSelect = document.getElementById("skill2Value");

function fillSkillValueOptions(selectElement) {
  selectElement.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "選択してください";
  selectElement.appendChild(emptyOption);

  for (let i = 0; i <= 15; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = String(i);
    selectElement.appendChild(option);
  }
}

fillSkillValueOptions(skill1ValueSelect);
fillSkillValueOptions(skill2ValueSelect);

button.addEventListener("click", () => {
  const skill1 = document.getElementById("skill1").value.trim();
  const skill1Value = document.getElementById("skill1Value").value;
  const skill2 = document.getElementById("skill2").value.trim();
  const skill2Value = document.getElementById("skill2Value").value;
  const slot = document.getElementById("slot").value;

  result.textContent =
`第一スキル: ${skill1 || "未入力"}
第一スキル値: ${skill1Value || "未選択"}

第二スキル: ${skill2 || "なし"}
第二スキル値: ${skill2 ? (skill2Value || "未選択") : "なし"}

スロット数: ${slot}`;
});
