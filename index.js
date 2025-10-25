
import React, { useRef, useState } from "react";
import "./SpotifyHome.css";

const playlists = [
  {
    title: "Made For You",
    items: [
      { name: "Daily Mix 1", img: "https://source.unsplash.com/200x200/?music" },
      { name: "Release Radar", img: "https://source.unsplash.com/200x200/?album" },
      { name: "Discover Weekly", img: "https://source.unsplash.com/200x200/?vinyl" },
    ],
  },
  {
    title: "Your Top Mixes",
    items: [
      { name: "Rock Mix", img: "https://source.unsplash.com/200x200/?rock" },
      { name: "Chill Mix", img: "https://source.unsplash.com/200x200/?chill" },
      { name: "Pop Mix", img: "https://source.unsplash.com/200x200/?pop" },
    ],
  },
];

// Simple demo track (royalty-free)
const DEMO_TRACK = {
  url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  title: "Sample Song",
  artist: "SoundHelix",
  cover: "https://source.unsplash.com/100x100/?audio",
};

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const { currentTime, duration } = audioRef.current;
    setProgress((currentTime / duration) * 100);
  };

  const onSeek = (e) => {
    const percent = e.target.value;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (percent / 100) * duration;
    setProgress(percent);
  };

  return (
    <div className="music-player">
      <img src={DEMO_TRACK.cover} alt="cover" className="player-cover" />
      <div className="player-info">
        <div className="player-title">{DEMO_TRACK.title}</div>
        <div className="player-artist">{DEMO_TRACK.artist}</div>
      </div>
      <button className="player-btn" onClick={togglePlay}>
        {playing ? "❚❚" : "►"}
      </button>
      <input
        type="range"
        className="player-progress"
        min={0}
        max={100}
        value={progress}
        onChange={onSeek}
      />
      <audio
        ref={audioRef}
        src={DEMO_TRACK.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}

function SpotifyHome() {
  return (
    <div className="spotify-home">
      <aside className="sidebar">
        <h1>Spotify</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Search</li>
            <li>Your Library</li>
          </ul>
        </nav>
      </aside>
      <main>
        <header className="hero">
          <h2>Good afternoon</h2>
          <div className="hero-cards">
            <div className="hero-card">Liked Songs</div>
            <div className="hero-card">Top 2025 Hits</div>
            <div className="hero-card">Focus Flow</div>
          </div>
        </header>
        {playlists.map((pl, idx) => (
          <section key={idx}>
            <h3>{pl.title}</h3>
            <div className="playlist-row">
              {pl.items.map((item, i) => (
                <div className="playlist-card" key={i}>
                  <img src={item.img} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <MusicPlayer />
    </div>
  );
}

export default SpotifyHome;

