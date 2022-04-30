const screens = document.querySelectorAll(".screen");
const choose_disney_btns = document.querySelectorAll(".choose-disney-btn");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");

let seconds = 0;
let score = 0;
let selected_disney = {};

// Move to the second screen
start_btn.addEventListener("click", () => screens[0].classList.add("up"));

// Add Event Listener to Four Disney Buttons
choose_disney_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_disney = { src, alt };
    screens[1].classList.add("up"); // Move to the third screen
    setTimeout(createDisney, 1000); // Wait a second and call createDisney
    startGame(); // startGame on the third screen
  });
});

// Activate the timer
function startGame() {
  setInterval(increaseTime, 1000);
}

// Set the timer
function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

// Create Disney
function createDisney() {
  const disney = document.createElement("div");
  disney.classList.add("disney");

  const { x, y } = getRandomLocation();
  disney.style.top = `${y}px`;
  disney.style.left = `${x}px`;
  disney.innerHTML = `
  <img src="${selected_disney.src}"
  alt="${selected_disney.alt}"
  style="transform: rotate(${Math.random() * 360}deg)" />
  `;

  disney.addEventListener("click", catchDisney);
  game_container.appendChild(disney);
}

// Create Random Location
function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

// Catch Disney
function catchDisney() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addDisney();
}

// Add two Disney after catch one Disney
function addDisney() {
  setTimeout(createDisney, 1000);
  setTimeout(createDisney, 1500);
}

// Increase Score
function increaseScore() {
  score++;

  if (score > 14) {
    message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
