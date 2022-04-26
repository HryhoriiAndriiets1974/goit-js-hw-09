const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyColor = document.querySelector("body");

let timerId = null;

bodyColor.style.textAlign = "center";
stopBtn.setAttribute('disabled', true);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener("click", () => {
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
});
