//Credit to Mateusz Rybczonek for Timer Logic
const TIME_LIMIT = 10;
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = TIME_LIMIT/2;
const ALERT_THRESHOLD = TIME_LIMIT/5;
var status;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

let timer = document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}    
</span>
</div>
`;

const pauseBtn = document.getElementById("timer-wrapper");
var pauseIcon= document.getElementById("pause")
startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
  pendo.onGuideAdvanced()
}

function startTimer() {
  status = "started";
  timerInterval = setInterval(() => {
    if (status == "started") {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft <= 0) {
        onTimesUp();
      }
    } else if(status == "paused"){
      clearInterval(timerInterval);
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function pauseTimer() {
  if(status == "paused"){
    startTimer()
    pauseIcon.classList.remove('play');
    pauseIcon.classList.add('pause');
  }else{
    status = "paused";
    pauseIcon.classList.remove('pause');
    pauseIcon.classList.add('play');

  }
  
}

pauseBtn.addEventListener("click", pauseTimer);

step.after('teardown', function () {
        clearInterval(timerInterval);
});
