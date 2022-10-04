const musicAddBtn = document.querySelector('')

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
    height: '0',
    width: '0',
    videoId: youtube_id,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    plyerVars: {
      width: 0,
      heigth: 0,
      rel: 0,
      autoplay: 0,
      // controls: 0,
      showinfo: 1,
      loop: 1,
      playlist: youtube_id,
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

let playlist = [];