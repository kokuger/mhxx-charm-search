const multiButton = document.getElementById("multiCheckButton");
const result = document.getElementById("result");

if (multiButton) {
  multiButton.addEventListener("click", () => {
    result.textContent = "仮の検索結果";
  });
}
