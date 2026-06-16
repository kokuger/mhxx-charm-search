const multiButton = document.getElementById("multiCheckButton");
const multiResult = document.getElementById("result");

if (multiButton) {
  multiButton.addEventListener("click", () => {
    multiResult.textContent = "仮の検索結果";
  });
}
