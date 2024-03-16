let timer;
let startTime;
let running = false;
let lapTimes = [];

const display = document.getElementById('display');
const lapList = document.getElementById('lap-times');

function startStopwatch() {
  if (!running) {
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
    running = true;
  }
}

function pauseStopwatch() {
  clearInterval(timer);
  running = false;
}

function resetStopwatch() {
  clearInterval(timer);
  running = false;
  display.textContent = '00:00:00';
  lapList.innerHTML = '';
  lapTimes = [];
}

function lapStopwatch() {
  const lapTime = calculateLapTime();
  lapTimes.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}

function updateTime() {
  const elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hours = Math.floor(minutes / 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

function calculateLapTime() {
  const currentTime = Date.now();
  const lapTime = currentTime - startTime;
  return formatTime(lapTime);
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', lapStopwatch);
