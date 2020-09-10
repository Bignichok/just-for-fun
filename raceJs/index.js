const MAX_ENEMY = 7;

const game = document.querySelector(".game");
const score = document.querySelector(".score");
const start = document.querySelector(".start");
const gameArea = document.querySelector(".gameArea");
const car = document.createElement("div");

const audio = document.createElement("embed");
audio.src = "audio.mp3";
audio.type = "audio/mp3";
audio.style.cssText = `position: absolute; top: -1000px`;
car.classList.add("car");

start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const settings = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 2,
};

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
  start.classList.add("hide");
  gameArea.innerHTML = "";
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement("div");
    line.classList.add("lines");
    line.style.top = i * 100 + "px";
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
    const enemy = document.createElement("div");
    const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
    enemy.classList.add("enemy");
    enemy.y = -100 * settings.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50));
    enemy.style.top = enemy.y + "px";
    enemy.style.background = `transparent url("./image/enemy${randomEnemy}.png") center / cover no-repeat`;
    gameArea.appendChild(enemy);
  }

  settings.score = 0;
  settings.start = true;
  gameArea.appendChild(car);
  gameArea.appendChild(audio);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
  car.style.top = "auto";
  car.style.bottom = "10px";
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  settings.score += settings.speed;
  score.textContent = `SCORE ${settings.score}`;
  if (settings.score > 1000) {
    settings.speed = 4;
  } else if (settings.score > 3000) {
    settings.speed = 5;
  } else if (settings.score > 5000) {
    settings.speed = 6;
  } else if (settings.score > 7000) {
    settings.speed = 7;
  } else if (settings.score > 10000) {
    settings.speed = 8;
  }
  moveRoad();
  moveEnemy();
  if (settings.start) {
    if (keys.ArrowLeft && settings.x > 0) {
      settings.x -= settings.speed;
    }
    if (keys.ArrowRight && settings.x < gameArea.offsetWidth - car.offsetWidth) {
      settings.x += settings.speed;
    }
    if (keys.ArrowDown && settings.y < gameArea.offsetHeight - car.offsetHeight) {
      settings.y += settings.speed;
    }
    if (keys.ArrowUp && settings.y > 0) {
      settings.y -= settings.speed;
    }

    car.style.left = settings.x + "px";
    car.style.top = settings.y + "px";
    requestAnimationFrame(playGame);
  }
}

function startRun(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function stopRun(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function moveRoad() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach((line, i) => {
    line.y += settings.speed;
    line.style.top = line.y + "px";

    if (line.y > +document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach((i) => {
    let carRect = car.getBoundingClientRect();
    let enemyRect = i.getBoundingClientRect();

    if (
      carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left &&
      carRect.left <= enemyRect.right &&
      carRect.bottom >= enemyRect.top
    ) {
      console.log("dtp");
      settings.start = false;
      start.classList.remove("hide");
      settings.score = 0;
    }
    i.y += settings.speed / 2;
    i.style.top = i.y + "px";

    if (i.y >= document.documentElement.clientHeight) {
      i.y = -100 * settings.traffic;
    }
  });
}
