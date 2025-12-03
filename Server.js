let token = null;
let userRole = null;

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok) {
    token = data.token;
    userRole = data.role;
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    if (userRole === 'admin') document.getElementById('admin-panel').style.display = 'block';
    loadSongs();
  } else {
    alert('Login failed');
  }
});

async function loadSongs() {
  const res = await fetch('/songs');
  const songs = await res.json();
  const list = document.getElementById('song-list');
  list.innerHTML = songs.map(song => `<div class="song-item" onclick="playSong('${song.file}', '${song.title}')">${song.title} by ${song.artist}</div>`).join('');
}

function playSong(file, title) {
  document.getElementById('audio-player').src = `/uploads/${file}`;
  document.getElementById('current-song').textContent = title;
}

document.getElementById('admin-panel').addEventListener('click', () => {
  document.getElementById('add-song-form').style.display = 'block';
});

document.getElementById('song-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('/songs', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  if (res.ok) {
    loadSongs();
    document.getElementById('add-song-form').style.display = 'none';
  } else {
    alert('Failed to add song');
  }
});
