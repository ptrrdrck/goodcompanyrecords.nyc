var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    height: '100%',
    videoId: 'nFAK8Vj62WM',
    playerVars: {
      'autoplay': 1,
      'showinfo': 0,
      'autohide': 1,
      'controls': 0,
      'modestbranding': 1,
      'loop': 1,
      'playlist': 'nFAK8Vj62WM'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
    event.target.playVideo();
    //player.mute();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.playVideo();
    }
}

function stopVideo() {
    player.stopVideo();
}