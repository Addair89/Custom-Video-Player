const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const totalDuration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
const player = document.querySelector('.player');
// Play & Pause ----------------------------------- //

const showPlayIcon = () => {
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title', 'Play')
}

const togglePlay = () => {
    if(video.paused) {
        video.play();
        playBtn.classList.replace('fa-play','fa-pause')
        playBtn.setAttribute('title', 'Pause')
    } else {
        video.pause();
        showPlayIcon();
    }
}

//On video end
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

//Calc display format
const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    
    return `${minutes}:${seconds}`;
}


//Update Progress bar as video plays
const updateProgress = () => {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    totalDuration.textContent = `${displayTime(video.duration)}`;
}

//Click to set progress
const setProgress = (e) => {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    console.log(newTime);
    video.currentTime = newTime * video.duration; 
}
// Volume Controls --------------------------- //

let lastVolume = 1;

//Volume bar
const changeVolume = (e)=>{
    let volume = e.offsetX / volumeRange.offsetWidth;
    //Rounding vloume up or down
    if(volume < 0.1) {
        volume = 0;
    }
    if(volume > 0.9){
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume;
    //change icon depending on volume
    volumeIcon.className = '';
    if(volume >= 0.7){
        volumeIcon.classList.add('fa-solid', 'fa-volume-up');
    } else if(volume < 0.7 && volume > 0){
        volumeIcon.classList.add('fa-solid', 'fa-volume-down');
    }else if(volume === 0){
        volumeIcon.classList.add('fa-solid', 'fa-volume-x-mark');
    }
    lastVolume = volume;
}

//Mute/Unmute
const toggleMute = () => {
    if(video.volume){
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.remove('fa-volume-down');
        volumeIcon.classList.add('fa-volume-xmark');

    } else {
        video.volume = lastVolume
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.remove('fa-volume-xmark');
        if(lastVolume >= 0.7){
            volumeIcon.classList.add('fa-solid', 'fa-volume-up');
        } else if(lastVolume < 0.7 && lastVolume > 0){
            volumeIcon.classList.add('fa-solid', 'fa-volume-down');
        }else if(lastVolume === 0){
            volumeIcon.classList.add('fa-solid', 'fa-volume-x-mark');
        }
    }
}

// Change Playback Speed -------------------- //

const setPlaybackSpeed = () =>{
    video.playbackRate = speed.value;  
}

// Fullscreen ------------------------------- // 
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

  let fullscreen = false;
  //Toggle FullScreen
  const toggleFullscreen =()=>{
    if(!fullscreen){
        openFullscreen(player);
    }else{
        closeFullscreen();
    }
    fullscreen = !fullscreen;
  }

//event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', setPlaybackSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
