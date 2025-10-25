// Example song data
const songs = [
    { title: "Lost in the Dream", artist: "Fury Beats" },
    { title: "Blue Horizon", artist: "Night Sky" },
    { title: "Creamy Dust", artist: "Mellow Vibes" },
    { title: "Echoes of Fury", artist: "Aurora" },
    { title: "Serenade", artist: "Echo Lane" }
];

const musicList = document.getElementById('music-list');
const searchBar = document.getElementById('searchBar');
const nowPlaying = document.getElementById('now-playing');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');

let currentSong = null;

// Render songs
function renderSongs(list) {
    musicList.innerHTML = '';
    if (list.length === 0) {
        musicList.innerHTML = '<div style="padding:1rem;text-align:center;color:#b1b8c7;">No songs found.</div>';
        return;
    }
    list.forEach((song, idx) => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <div class="song-info">
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${song.artist}</span>
            </div>
            <span>▶️</span>
        `;
        songDiv.addEventListener('click', () => selectSong(song));
        musicList.appendChild(songDiv);
    });
}

// Song select and play simulation
function selectSong(song) {
    currentSong = song;
    nowPlaying.textContent = `Now Playing: "${song.title}" by ${song.artist}`;
    playBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Interactivity: search songs
searchBar.addEventListener('input', () => {
    const q = searchBar.value.toLowerCase();
    const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q)
    );
    renderSongs(filtered);
    // Reset player if no song is shown
    if (!filtered.some(song => song === currentSong)) {
        nowPlaying.textContent = "Nothing playing...";
        playBtn.disabled = true;
        pauseBtn.disabled = true;
    }
});

// Play and pause button simulation
playBtn.addEventListener('click', () => {
    if (currentSong) {
        nowPlaying.textContent = `Playing: "${currentSong.title}" by ${currentSong.artist} 🎵`;
        playBtn.disabled = true;
        pauseBtn.disabled = false;
    }
});
pauseBtn.addEventListener('click', () => {
    if (currentSong) {
        nowPlaying.textContent = `Paused: "${currentSong.title}" by ${currentSong.artist}`;
        playBtn.disabled = false;
        pauseBtn.disabled = true;
    }
});

// Initial render
renderSongs(songs);
