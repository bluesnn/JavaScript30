const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let mousedown = false;

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  console.log(this)
  const icon = this.paused ? '►' : '❚❚';
  console.log(icon)
  toggle.textContent = icon;
}

function skip() {
  console.log(video.currentTime,this.dataset)
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleUpdateRange() {
  console.log(this.value)
  video[this.name] = this.value;
}

function handleProgress() {
  console.log(video.currentTime, video.duration)
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e)
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(progress.offsetWidth)
}
console.log(progress.offsetWidth)

function fullScreen() {
  if (video.requestFullscreen) {
      video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
  } else if (i.msRequestFullscreen) {
      video.msRequestFullscreen();
  }
}

// 暂停 or 播放
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// 暂停 or 播放按钮状态
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// 快进、快退
skipButtons.forEach(el => el.addEventListener('click', skip));

// 音量和播放速度
ranges.forEach(el => el.addEventListener('mousemove', handleUpdateRange));

// 进度条进度
video.addEventListener('timeupdate', handleProgress);

// 点击进度条
progress.addEventListener('click', scrub);

// 拖动进度条
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
