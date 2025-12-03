const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const songsFile = path.join(__dirname, 'songs.json');

// Load songs from file
const loadSongs = () => {
  if (fs.existsSync(songsFile)) {
    return JSON.parse(fs.readFileSync(songsFile));
  }
  return [
    { id: 1, title: 'Song 1', artist: 'Artist 1', url: 'path/to/song1.mp3' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', url: 'path/to/song2.mp3' }
  ];
};

// Save songs to file
const saveSongs = (songs) => {
  fs.writeFileSync(songsFile, JSON.stringify(songs, null, 2));
};

// Routes
app.get('/songs', (req, res) => {
  res.json(loadSongs());
});

app.post('/songs', (req, res) => {
  const songs = loadSongs();
  const newSong = { id: Date.now(), ...req.body };
  songs.push(newSong);
  saveSongs(songs);
  res.json(newSong);
});

// Admin auth (simple)
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
