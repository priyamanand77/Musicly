console.log("Welcome to Spotify");

/*

document.querySelector("body > div.container1 > div.songList > div > div:nth-child(2) > span.songlistplay > span").innerText = '43:22'
document.querySelector("body > div.container1 > div.songList > div > div:nth-child(2) > span.songName").innerText="aaa"
document.querySelector("body > div.container1 > div.songList > div > div:nth-child(2) > img")
*/

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Uski Adaon Ne Deewana Mujhe Kar Diya Song",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
    duration: "03:33",
  },
  {
    songName: "Phir bhi tumko chahunga",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
    duration: "04:34",
  },
  {
    songName: "Falak Tak Chal Sath Mere - slow & reverb",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
    duration: "06:10",
  },
  {
    songName: "Filhaal2 Mohabbat",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
    duration: "05:25",
  },
  {
    songName: "Titliaan",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
    duration: "04:20",
  },
  {
    songName: "Sajna Hai Mujhe ",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
    duration: "03:46",
  },
  {
    songName: "Kahe Tohse Sajana",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
    duration: "02:40",
  },
  {
    songName: "Main Woh Chaand",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
    duration: "06:04",
  },
  {
    songName: "Ed Sheeran - Perfect",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
    duration: "04:45",
  },
  {
    songName: "Ali Gatie - It's You",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
    duration: "03:34",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  // let durationele = "body > div.container1 > div.songList > div > div:nth-child("+(i+2)+") > span.songlistplay > span";
  // document.querySelector(durationele).innerText =
  let durationele =
    "#songtable > tbody > tr:nth-child(" +
    (i + 2) +
    ") > td > div > span.songlistplay > span";
  document.querySelector(durationele).innerText = songs[i].duration;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

function searchfilter() {
  let filter = document.getElementById("myinput").value.toUpperCase();
  let mt = document.getElementById("songtable");
  let tr = mt.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[0];

    if (td) {
      let tcontent = td.textContent || td.innerHTML;
      if (tcontent.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
