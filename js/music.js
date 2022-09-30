// initializaion
// SPOTIFY SDK SCRIPT
const script = document.createElement("script");
script.src = "https://sdk.scdn.co/spotify-player.js";
script.async = true;

// event
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQCpfy4XBqFhj_Ln-zP9D2v7mGXg1_7Sj5S5DQu_S598RPcxAq3fk5F78T8TMoz2TsAuxGFN4eMHT-1skOO3pu3ZfDMDLgFTF-lCVre5g7l_2F4eCUVk7KVyb0P6FevrDcgDtMVh7Ljr20vBufhZ5T0F55gt90Rnr9jAcHyjT235VHsB-sZYqV37J3Vm0ViM1K4e9FZbeXVjcH7pVF0bWKE';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb('BQCpfy4XBqFhj_Ln-zP9D2v7mGXg1_7Sj5S5DQu_S598RPcxAq3fk5F78T8TMoz2TsAuxGFN4eMHT-1skOO3pu3ZfDMDLgFTF-lCVre5g7l_2F4eCUVk7KVyb0P6FevrDcgDtMVh7Ljr20vBufhZ5T0F55gt90Rnr9jAcHyjT235VHsB-sZYqV37J3Vm0ViM1K4e9FZbeXVjcH7pVF0bWKE'); },
    volume: 0.5
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });
  
  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });
  
  player.addListener('initialization_error', ({ message }) => { 
    console.error(message);
  });
  
  player.addListener('authentication_error', ({ message }) => {
      console.error(message);
  });
  
  player.addListener('account_error', ({ message }) => {
      console.error(message);
  });
  
  player.connect();

  const playbtn = document.querySelector('.play')
  
  // controlling playback
  playbtn.onclick = function() {
    player.togglePlay()
  }
};



document.body.appendChild(script);

const backbtn = document.querySelector('.back')
const nextbtn = document.querySelector('.next')
const shufflebtn = document.querySelector('.shuffle')
const repeatbtn = document.querySelector('.repeat')


