function updateClock() {
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hour = now.getHours();

  document.getElementById("second").style.transform = `translateX(-50%) rotate(${sec * 6}deg)`;
  document.getElementById("minute").style.transform = `translateX(-50%) rotate(${min * 6}deg)`;
  document.getElementById("hour").style.transform = `translateX(-50%) rotate(${(hour % 12) * 30 + min * 0.5}deg)`;
}

setInterval(updateClock, 1000);
updateClock();

const numbersContainer = document.getElementById("clockNumbers");
for (let i = 1; i <= 12; i++) {
  const span = document.createElement("span");
  span.innerText = i;

  const angle = (i * 30) - 90;
  const radius = 130;

  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  span.style.position = "absolute";
  span.style.left = `calc(50% + ${x}px)`;
  span.style.top = `calc(50% + ${y}px)`;
  span.style.transform = "translate(-50%, -50%)";

  numbersContainer.appendChild(span);
}


let timerInterval;
let totalSeconds = 0;
let elapsedSeconds = 0;

function startStudyTimer() {
  clearInterval(timerInterval);

  const inputMinutes = parseInt(document.getElementById("studyMinutes").value);
  if (!inputMinutes || inputMinutes <= 0) {
    alert("Please enter valid minutes.");
    return;
  }

  totalSeconds = inputMinutes * 60;
  elapsedSeconds = 0;

  timerInterval = setInterval(() => {
    elapsedSeconds++;

    const passedMin = Math.floor(elapsedSeconds / 60);
    const passedSec = elapsedSeconds % 60;

    const remain = totalSeconds - elapsedSeconds;
    const remainMin = Math.floor(remain / 60);
    const remainSec = remain % 60;

    document.getElementById("timerStatus").innerHTML =
      `✅ <span style="color:green;">Time Passed:</span> ${passedMin}m ${passedSec}s &nbsp; | ⏳ <span style="color:orange;">Remaining:</span> ${remainMin}m ${remainSec}s`;

    if (elapsedSeconds >= totalSeconds) {
      clearInterval(timerInterval);
      document.getElementById("timerStatus").innerHTML = `⏰ Time’s up! Great job 🎉`;
      alert("⏰ Time’s up! Take a break!");
    }
  }, 1000);
}



