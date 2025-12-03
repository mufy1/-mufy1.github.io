import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Load songs from localStorage or API
    const loadSongs = async () => {
      try {
        const response = await fetch('http://localhost:3001/songs'); // Backend API
        const data = await response.json();
        setSongs(data);
        setFilteredSongs(data);
      } catch {
        // Fallback to localStorage
        const localSongs = JSON.parse(localStorage.getItem('songs')) || [
          { id: 1, title: 'Song 1', artist: 'Artist 1', url: 'path/to/song1.mp3' },
          { id: 2, title: 'Song 2', artist: 'Artist 2', url: 'path/to/song2.mp3' }
        ];
        setSongs(localSongs);
        setFilteredSongs(localSongs);
      }
    };
    loadSongs();
  }, []);

  const playSong = (song) => {
    if (audio) audio.pause();
    const newAudio = new Audio(song.url); // Web Audio API integration
    newAudio.play();
    setAudio(newAudio);
    setCurrentSong(song);
    setIsPlaying(true);
    newAudio.onended = () => setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const searchSongs = (query) => {
    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Musical Fury</h1>
      </header>
      <div className="sidebar">
        <h2>Playlists</h2>
        <ul>
          <li>Favorites</li>
          <li>Recently Played</li>
        </ul>
      </div>
      <div className="main-content">
        <input
          type="text"
          placeholder="Search songs..."
          onChange={(e) => searchSongs(e.target.value)}
          className="search"
        />
        <ul className="song-list">
          {filteredSongs.map(song => (
            <li key={song.id} className="song-item" onClick={() => playSong(song)}>
              {song.title} - {song.artist}
            </li>
          ))}
        </ul>
      </div>
      <div className="controls">
        <button onClick={() => {/* Prev logic */}}>Prev</button>
        <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={() => {/* Next logic */}}>Next</button>
        <div>{currentSong ? `${currentSong.title} - ${currentSong.artist}` : 'No song playing'}</div>
      </div>
    </div>
  );
}

export default App;
