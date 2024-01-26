const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
console.log(audio);
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['Cradles', 'Greedy', 'I wanna be yours', 'Mood', 'Senorita', 'Shape of you', 'levitating' , 'On my way', 'Peaches' , 'Austraunaut'];

const songDetails= [
{
  name: "Cradles",
  src:"music/Cradles .mp3",
  image:"images/Cradles.webp.png",
},
{
  name: "Greedy",
  src:"music/Greedy.mp3",
  image:"images/greedy.jpg",
},
{
  name: "I wanna be Yours",
  src:"music/I Wanna Be Yours.mp3",
  image:"images/I wanna be yours.jpeg",
},
{
  name: "Mood",
  src:"music/Mood.mp3",
  image:"images/24kGoldn_-_Mood.png",
},
{
  name: "Señorita",
  src:"music/Señorita .mp3",
  image:"images/Señorita.png",
},
{
  name: "Shape of you",
  src:"music/Shape of You .mp3",
  image:"images/Shape of you.jpg",
},
{
  name:"Levitating",
  src:"music/Levitating.mp3",
  image:"images/levitating.jpg"
},
{
  name:"Peaches",
  src:"music/Peaches.mp3",
  image:"images/default.jpg"
},
{
  name:"On My Way",
  src:"music/On my Way.mp3",
  image:"images/On-My-Way-.jpg"
},
{
  name:"Astronaut In The Ocean",
  src:"music/Astronaut In The Ocean.mp3",
  image:"images/astronaut.jpg"
}
]

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songDetails[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song.name;
  audio.src = song.src;
  cover.src = song.image;
}

// Play song
function playSong() {
  console.log("Audio Srx", audio.src)
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songDetails[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songDetails[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress() {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime() {
  const { duration, currentTime } = audio;
  var sec;
  var sec_d;

  // define minutes currentTime
  let min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? '0' + min : min;

  // define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? '0' + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? '0' + sec : sec;
    }
  }

  get_sec(currentTime);

  // change currentTime DOM
  currTime.innerHTML = min + ':' + sec;

  // define minutes duration
  let min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
  min_d = min_d < 10 ? '0' + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
      }
    } else {
      sec_d = (isNaN(duration) === true) ? '0' : Math.floor(x);
      sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
    }
  }

  // define seconds duration
  get_sec_d(duration);

  // change duration DOM
  durTime.innerHTML = min_d + ':' + sec_d;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);