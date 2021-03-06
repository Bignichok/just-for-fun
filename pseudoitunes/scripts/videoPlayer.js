import { addZero } from "./supScript.js";

export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector(".video-player");
  const videoButtonPlay = document.querySelector(".video-button__play");
  const videoButtonStop = document.querySelector(".video-button__stop");
  const videoTimePassed = document.querySelector(".video-time__passed");
  const videoProgress = document.querySelector(".video-progress");
  const videoTimeTotal = document.querySelector(".video-time__total");
  const videoFullscreen = document.querySelector(".video-fullscreen");
  const videoVolume = document.querySelector(".video-volume");
  const volumeMin = document.querySelector(".volume-min");
  const volumeMax = document.querySelector(".volume-max");

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove("fa-pause");
      videoButtonPlay.classList.add("fa-play");
    } else {
      videoButtonPlay.classList.remove("fa-play");
      videoButtonPlay.classList.add("fa-pause");
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else videoPlayer.pause();
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  videoPlayer.addEventListener("click", togglePlay);
  videoButtonPlay.addEventListener("click", togglePlay);

  videoPlayer.addEventListener("play", toggleIcon);
  videoPlayer.addEventListener("pause", toggleIcon);

  videoButtonStop.addEventListener("click", stopPlay);

  videoPlayer.addEventListener("timeupdate", () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  videoProgress.addEventListener("input", () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoFullscreen.addEventListener("click", () => {
    videoPlayer.requestFullscreen();
  });

  videoVolume.addEventListener("input", () => {
    videoPlayer.volume = videoVolume.value / 100;
  });

  videoVolume.value = videoPlayer * 100;

  volumeMin.addEventListener("click", () => {
    videoPlayer.volume = 0;
    videoVolume.value = 0;
  });

  volumeMax.addEventListener("click", () => {
    videoPlayer.volume = 1;
    videoVolume.value = 100;
  });

  videoPlayerInit.stop = () => {
    if (!videoPlayer.paused) {
      stopPlay();
    }
  };
};
