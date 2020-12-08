let countdown;
const timerDisplay = document.querySelector(".displayTimeLeft");
const endTime = document.querySelector(".displayEndTime");
const buttons = document.querySelectorAll("[data-time]");
const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");
const resetButton = document.querySelector("#reset-button");
const finishSound = new Audio("sounds/timersound.wav");

startButton.addEventListener("click", continueTimer);
resetButton.addEventListener("click", resetTimer);
stopButton.addEventListener("click", pauseTimer);

startButton.classList.add("disabled");
stopButton.classList.add("disabled");
resetButton.classList.add("disabled");

function timer(seconds) {
  //clear any existing timers
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  resetButton.classList.remove("disabled");
  stopButton.classList.remove("disabled");

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //Check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      timerEnded();
      endTime.textContent = "";
      return;
    }
    //Display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Timer finishes at ${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
  startButton.classList.add("disabled");
  stopButton.classList.remove("disabled");
}

function continueTimer() {
  const timerArray = timerDisplay.textContent.split(":");
  const currentMins = parseInt(timerArray[0]);
  const secs = parseInt(timerArray[1]);
  const seconds = currentMins * 60 + secs;
  timer(seconds);
  startButton.classList.add("disabled");
  stopButton.classList.remove("disabled");
}

function pauseTimer() {
  clearInterval(countdown);
  stopButton.classList.add("disabled");
  startButton.classList.remove("disabled");
}

function resetTimer() {
  clearInterval(countdown);
  displayTimeLeft(0);
  endTime.textContent = "";
  stopButton.classList.add("disabled");
  resetButton.classList.add("disabled");
  startButton.classList.add("disabled");
}

function timerEnded() {
  finishSound.play();
  M.toast({ html: "Your timer has finished!", displayLength: "10000" });
  startButton.classList.add("disabled");
  stopButton.classList.add("disabled");
  resetButton.classList.add("disabled");
}

buttons.forEach((button) => button.addEventListener("click", startTimer));

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
  startButton.classList.add("disabled");
});

//Side nav initialization
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
});

//Tap target initialization
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tap-target");
  var instances = M.TapTarget.init(elems, {});
});
