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

// Music obj
let playlists = [];

function savePlaylist(params) {
  localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlists))
}

function onMusicClick(event) {
  
}

function showPlaylist(newMusic) {
  // <div class="a-music">
  //       <span>Title</span>
  // </div>
  const playlist = document.querySelector('.playlist')
  const outerDiv = document.createElement('div')
  const titleSpan = document.createElement('span')
  titleSpan.innerText = newMusic
  outerDiv.appendChild(titleSpan)
  playlist.appendChild(outerDiv)
  // 생성된 음악에 이벤트리스너 추가
  outerDiv.addEventListener('click', onMusicClick)
}

function onMusicFormSubmit(event) {
  event.preventDefault();
  const link = linkInput.value;
  const musicObj = {
    // text: _,
    url: link,
    id: Date.now(),
  };
  console.log(link)
  playlists.push(musicObj);
  showPlaylist();
  savePlaylist()
  onCloselick();
}

function onAddClick(event) {
  musicAddBtn.classList.add('plus-form');
  musicForm.classList.remove('hidden');
  addImg.classList.add('hidden');
  playlistHeading.classList.add('hidden');
  closeBtn.classList.remove('hidden');
  musicAddBtn.removeEventListener('click', onAddClick);
  console.log('clickAdd');
}

function onCloselick(event) {
  musicAddBtn.classList.remove('plus-form');
  musicForm.classList.add('hidden');
  addImg.classList.remove('hidden');
  playlistHeading.classList.remove('hidden');
  closeBtn.classList.add('hidden');
  musicAddBtn.addEventListener('click', onAddClick);
  
  console.log('clickClose');
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
    videoId: 'xSn48vDPSzI',
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
  console.log(event.target)
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