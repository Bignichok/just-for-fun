export const radioPlayerInit = () => {
  const radio = document.querySelector(".radio");
  const radioCoverImg = document.querySelector(".radio-cover__img");
  const radioNavigation = document.querySelector(".radio-navigation");
  const radioHeaderBig = document.querySelector(".radio-header__big");
  const radioItem = document.querySelectorAll(".radio-item");
  const radioStop = document.querySelector(".radio-stop");
  const radioVolume = document.querySelector(".radio-volume");
  const volumeMinRadio = document.querySelector(".volume-min-radio");
  const volumeMaxRadio = document.querySelector(".volume-max-radio");

  let prevVolume = 1;

  const audio = new Audio();
  audio.type = "audio/aac";

  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-stop");
    } else {
      radio.classList.add("play");
      radioStop.classList.add("fa-stop");
      radioStop.classList.remove("fa-play");
    }
  };

  const selectItem = (elem) => {
    radioItem.forEach((item) => item.classList.remove("select"));
    elem.classList.add("select");
  };
  radioNavigation.addEventListener("change", (event) => {
    const target = event.target;
    const parent = target.closest(".radio-item");
    selectItem(parent);

    const title = parent.querySelector(".radio-name").textContent;

    const urlImg = parent.querySelector(".radio-img").src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    radioHeaderBig.textContent = title;

    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }

    changeIconPlay();
  });

  radioVolume.addEventListener("input", () => {
    audio.volume = radioVolume.value / 100;
  });

  audio.value = radioVolume * 100;

  volumeMinRadio.addEventListener("click", () => {
    if (audio.volume) {
      prevVolume = audio.volume;
      radioVolume.value = 0;
      audio.volume = 0;
    } else {
      audio.volume = prevVolume;
      radioVolume.value = prevVolume * 100;
    }
  });

  volumeMaxRadio.addEventListener("click", () => {
    radioVolume.value = 100;
    audio.volume = 1;
  });

  radioPlayerInit.stop = () => {
    audio.pause();
    changeIconPlay();
  };
};
