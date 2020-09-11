const MAX_ENEMY = 7;
const HEIGHT_ELEM = 100;

const game = document.querySelector(".game");
const score = document.querySelector(".score");
const start = document.querySelector(".start");
const gameArea = document.querySelector(".gameArea");
const car = document.createElement("div");

// const audio = document.createElement("embed");
// audio.src = "audio.mp3";
// audio.type = "audio/mp3";
// audio.style.cssText = `position: absolute; top: -1000px`;
car.classList.add("car");

const countSection = Math.floor(document.documentElement.clientHeight / HEIGHT_ELEM);

gameArea.style.height = countSection * HEIGHT_ELEM;

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
  level: 0,
};

let level = settings.level;

const getScore = localStorage.getItem("nfjs_score", settings.score);
topScore.textContent = getScore ? getScore : 0;

const addLocalStorage = () => {
  if (getScore < settings.score) {
    localStorage.setItem("nfjs_score", settings.score);
    topScore.textContent = settings.score;
  }
};

function getQuantityElements(heightElement) {
  return gameArea.offsetHeight / heightElement + 1;
}

function startGame(e) {
  const target = e.target;

  if (target === start) {
    return;
  }

  switch (target.id) {
    case "easy":
      settings.speed = 3;
      settings.traffic = 4;
      break;
    case "medium":
      settings.speed = 5;
      settings.traffic = 3;
      break;
    case "hard":
      settings.speed = 7;
      settings.traffic = 2;
      break;
  }

  start.classList.add("hide");
  gameArea.innerHTML = "";
  for (let i = 0; i < getQuantityElements(HEIGHT_ELEM) + 1; i++) {
    const line = document.createElement("div");
    line.classList.add("lines");
    line.style.top = i * HEIGHT_ELEM + "px";
    line.style.height = HEIGHT_ELEM / 2 + "px";
    line.y = i * HEIGHT_ELEM;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(HEIGHT_ELEM * settings.traffic); i++) {
    const enemy = document.createElement("div");
    const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
    enemy.classList.add("enemy");
    const periodEnemy = -HEIGHT_ELEM * settings.traffic * (i + 1);
    enemy.y = periodEnemy < 100 ? -100 * settings.traffic * (i + 1) : periodEnemy;
    enemy.style.left = Math.floor(
      Math.random() * (gameArea.offsetWidth - enemy.offsetWidth / 2)
    );
    enemy.style.top = enemy.y + "px";
    enemy.style.background = `transparent url("./image/enemy${randomEnemy}.png") center / cover no-repeat`;
    gameArea.appendChild(enemy);
  }

  settings.score = 0;
  settings.start = true;
  gameArea.appendChild(car);
  // gameArea.appendChild(audio);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
  car.style.top = "auto";
  car.style.bottom = "10px";
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  settings.level = Math.floor(settings.score / 1000);

  if (settings.level !== level) {
    level = settings.level;
    settings.speed += 1;
  }

  settings.score += settings.speed;
  score.textContent = `SCORE ${settings.score}`;

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
  } else {
    // audio.remove();
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
      line.y = -HEIGHT_ELEM;
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
      addLocalStorage();
      settings.start = false;
      start.classList.remove("hide");
      settings.score = 0;
    }
    i.y += settings.speed / 2;
    i.style.top = i.y + "px";

    if (i.y >= document.documentElement.clientHeight) {
      i.y = -HEIGHT_ELEM * settings.traffic;
      i.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - i.offsetWidth));
    }
  });
}
