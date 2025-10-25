const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const loopBtn = document.getElementById('loop');
const seekbar = document.getElementById('seekbar');
const currentSongSpan = document.getElementById('current-song');

let currentSong = null;
let isPlaying = false;
let isLooping = false;

// Load and play song
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const li = btn.closest('li');
        const songSrc = li.getAttribute('data-src');
        const songTitle = li.querySelector('span').innerText;
        if (audio.src !== location.origin + '/' + songSrc && audio.src !== songSrc) {
            audio.src = songSrc;
        }
        currentSongSpan.textContent = songTitle;
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = "Pause";
        currentSong = songSrc;
    });
});

// Play/Pause toggle
playPauseBtn.addEventListener('click', function() {
    if (!audio.src) return;
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = "Play";
        isPlaying = false;
    } else {
        audio.play();
        playPauseBtn.textContent = "Pause";
        isPlaying = true;
    }
});

// Loop toggle
loopBtn.addEventListener('click', function() {
    isLooping = !isLooping;
    audio.loop = isLooping;
    loopBtn.textContent = `Loop: ${isLooping ? "On" : "Off"}`;
});

// Update seekbar as song plays
audio.addEventListener('timeupdate', function() {
    if (audio.duration) {
        seekbar.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Seek functionality
seekbar.addEventListener('input', function() {
    if (audio.duration) {
        audio.currentTime = (seekbar.value / 100) * audio.duration;
    }
});

// When song ends, reset play button if not looping
audio.addEventListener('ended', function() {
    if (!audio.loop) {
        playPauseBtn.textContent = "Play";
        isPlaying = false;
    }
});
