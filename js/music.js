////////////////////////////////// start : musicForm

// plus 버튼 관련
const musicAddBtn = document.querySelector('.player .plus-btn');
const addImg = document.querySelector('.plus-btn img');
const playlistHeading = document.querySelector('.player h1');
const closeBtn = document.querySelector('.musicForm-close');
// musicForm 관련
const musicForm = document.querySelector('.musicForm');
const linkInput = document.querySelector('.musicForm input');

// Musics local storage key
const PLAYLIST_KEY = 'playlist'
const CURRENTSONG_KEY = 'currentSong'

// Music obj
let playlists = [];
// 현재 재생중인 노래 저장
let currentSong = JSON.parse(localStorage.getItem(CURRENTSONG_KEY))

function saveCurrentSong(params) {
  localStorage.setItem(CURRENTSONG_KEY, JSON.stringify(currentSong))
}
function savePlaylist(params) {
  localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlists))
}

function onMusicClick(event) {
  const youtube_id = event.target.parentNode.id
  currentSong = youtube_id
  
  showCurrentSong()
  saveCurrentSong();
}

// 현재 재생 중인 노래 위치에 맞춰 스크롤 위치
function moveScroll() {
  const playlist = document.querySelector('.playlist');
  // const height = playlist.scrollHeight;
  // let position = 100 / playlists.findIndex(element => element.youtube_id === currentSong)
  playlist.scrollTop = playlist.scrollHeight;
}

// 현재 재생 중인 노래에 클래스 추가, 아니라면 제거
function showCurrentSong() {
  const allMusic = document.querySelectorAll('.a-music')
  allMusic.forEach(function (element) {
    if (element.id !== currentSong) {
      element.classList.remove('playing')
    } else {
        element.classList.add('playing')
    }
  })
}

function showPlaylist(newMusic) {
  // <div class="a-music">
  //       <img>
  //       <span>Title</span>
  // </div>
  const playlist = document.querySelector('.playlist .music-wrap')
  const outerDiv = document.createElement('div')
  const titleSpan = document.createElement('span')
  const imgDiv = document.createElement('div')
  // const img = new Image;
  // img.src = newMusic.thumb
  titleSpan.innerText = newMusic.title
  imgDiv.style.backgroundImage = `url(${newMusic.thumb})`;
  outerDiv.appendChild(imgDiv)
  outerDiv.appendChild(titleSpan)
  outerDiv.classList.add('a-music')
  outerDiv.id = newMusic.youtube_id
  
  // 현재 재생 중인 노래라면 클래스 추가
  if (newMusic.youtube_id === currentSong) {
    outerDiv.classList.add('playing')
  }
  playlist.appendChild(outerDiv)
  // 생성된 음악에 이벤트리스너 추가
  outerDiv.addEventListener('click', onMusicClick)
}
moveScroll();

const noEmbed = 'https://noembed.com/embed?url=';
const urlForm = "https://www.youtube.com/watch?v=";

function onMusicFormSubmit(event) {
  event.preventDefault();
  var url = linkInput.value;

  // 유튜브 URL에서 영상 id 정규식
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var matchs = url.match(regExp);
  var youtube_id = matchs[7]
  var musicObj

  // 영상의 제목 얻기
  const fetch_url = noEmbed + urlForm + youtube_id;
  fetch(fetch_url)
  .then(res => res.json())
  .then(data => {
    const {thumbnail_url, title} = data;
    musicObj = {
      title: title,
      thumb: thumbnail_url,
      url: url,
      youtube_id: youtube_id,
    };
    playlists.push(musicObj);
    savePlaylist();
    onCloselick();
    showPlaylist(musicObj);
  })

}

function onAddClick(event) {
  musicAddBtn.classList.add('plus-form');
  musicForm.classList.remove('hidden');
  addImg.classList.add('hidden');
  playlistHeading.classList.add('hidden');
  closeBtn.classList.remove('hidden');
  musicAddBtn.removeEventListener('click', onAddClick);
}

function onCloselick(event) {
  musicAddBtn.classList.remove('plus-form');
  musicForm.classList.add('hidden');
  addImg.classList.remove('hidden');
  playlistHeading.classList.remove('hidden');
  closeBtn.classList.add('hidden');
  musicAddBtn.addEventListener('click', onAddClick);
}

const savedPlaylists = localStorage.getItem(PLAYLIST_KEY) 

if (savedPlaylists != null) {
  const parsedPlaylists = JSON.parse(savedPlaylists)
  playlists = parsedPlaylists
  parsedPlaylists.forEach(showPlaylist)
}

// musicForm 열기 
musicAddBtn.addEventListener('click', onAddClick);
// musicForm 닫기
closeBtn.addEventListener('click', onCloselick);

// musicForm 제출
musicForm.addEventListener('submit', onMusicFormSubmit);

////////////////////////////////// end : musicForm



////////////////////////////////// start : youtube API

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 플레이어 API 코드가 다운로드되는 즉시 실행
// 전역변수 player
var player;
function onYouTubeIframeAPIReady() {
  // 유튜브 동영상 아이디
  let youtube_id = '';
  player = new YT.Player('player', {
    height: '300',
    width: '400',
    videoId: currentSong,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    plyerVars: {
      width: 40,
      heigth: 30,
      rel: 0,
      autoplay: 1,
      // controls: 0,
      showinfo: 1,
      loop: 1,
      playlist: ' xSn48vDPSzI',
    }
  });
}

// 동영상 플레이어가 준비되면 재생을 시작해야 함
function onPlayerReady(event) {
  event.target.playVideo();
}

// 플레이어 상태 변경 시 (일시정지 등)
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

////////////////////////////////// end : youtube API



////////////////////////////////// start : play music

function onPlayerStateChange(event) {
  if(event.data == YT.PlayerState.ENDED) {
      handleNextBtnClick();
      event.target.playVideo();
  }
}

var pause = false;
function handlePauseBtnClick() {
  if(pause === false) {
      player.playVideo();
      pause = true;
      pauseButton.src = "./img/icon/play.png"
  } else {
      player.pauseVideo();
      pause = false;
      pauseButton.src = "./img/icon/pause.png";
  }
}

let nowPlaying = playlists.findIndex( element => element.youtube_id === currentSong)
function handleNextBtnClick() {
  if(nowPlaying >= playlists.length-1) {
    nowPlaying = 0;
  } else {
    nowPlaying++;
  }
  currentSong = playlists[nowPlaying].youtube_id
  showCurrentSong()
  saveCurrentSong()
  player.loadVideoById(playlists[nowPlaying].youtube_id)
}

function handleBeforeBtnClick() {
  if(nowPlaying <= 0) {
    nowPlaying = playlists.length-1;
  } else {
    nowPlaying--;
  }
  currentSong = playlists[nowPlaying].youtube_id
  showCurrentSong()
  saveCurrentSong()
  player.loadVideoById(playlists[nowPlaying].youtube_id)
}

function handleStopBtnClick() {
  player.stopVideo();
}

const beforeButton = document.querySelector(".back")
const pauseButton = document.querySelector(".pause")
const nextButton = document.querySelector(".next")

beforeButton.addEventListener("click", handleBeforeBtnClick)
pauseButton.addEventListener("click", handlePauseBtnClick)
// stopButton.addEventListener("click", handleStopBtnClick)
nextButton.addEventListener("click", handleNextBtnClick)

////////////////////////////////// end : play music