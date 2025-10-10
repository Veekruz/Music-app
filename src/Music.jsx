import React, { useState, useEffect } from "react";

export default function MusicList() {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Rema");
  const [loading, setLoading] = useState(false);

  const fetchMusic = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=20`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setSongs(data.results);
      } else {
        setSongs([]);
      }
    } catch (error) {
      console.error("Error fetching music:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <div style={styles.body}>
    <p style={styles.subtitle}>Discover your next favorite song</p>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for songs, artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <button onClick={fetchMusic} style={styles.button}>
            <span style={styles.searchIcon}>🔍</span>
            Search
          </button>
        </div>
      </div>

      {/* Music Container */}
      <div style={styles.musicContainer}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Finding amazing music...</p>
          </div>
        ) : songs.length > 0 ? (
          songs.map((song) => (
            <div key={song.trackId} style={styles.song}>
              {/* Album Art with Hover Effect */}
              <div style={styles.imageContainer}>
                <img
                  src={song.artworkUrl100 ? song.artworkUrl100.replace('100x100', '300x300') : "https://via.placeholder.com/300x300/333/fff?text=No+Artwork"}
                  alt={song.trackName}
                  style={styles.img}
                />
                {song.previewUrl && (
                  <div style={styles.playOverlay}>
                    <span style={styles.playIcon}>▶</span>
                  </div>
                )}
              </div>
              
              {/* Song Info */}
              <div style={styles.songInfo}>
                <h2 style={styles.title}>{song.trackName}</h2>
                <p style={styles.artist}>
                  <span style={styles.label}>Artist:</span> {song.artistName}
                </p>
                <p style={styles.album}>
                  <span style={styles.label}>Album:</span> {song.collectionName}
                </p>
                <p style={styles.genre}>
                  <span style={styles.label}>Genre:</span> {song.primaryGenreName}
                </p>
              </div>

              {/* Audio Player */}
              {song.previewUrl && (
                <div style={styles.audioContainer}>
                  <audio controls style={styles.audio}>
                    <source src={song.previewUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={styles.noResults}>
            <div style={styles.noResultsIcon}>🎵</div>
            <p style={styles.noResultsText}>No music found for "{searchTerm}"</p>
            <p style={styles.noResultsSubtext}>Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Styles
const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
    minHeight: "100vh",
    padding: "20px",
    color: "white",
  },
  header: {
    marginBottom: "40px",
    padding: "20px",
  },
  h1: {
    fontSize: "3rem",
    fontWeight: "700",
    background: "linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0 0 10px 0",
    textShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#b0b0b0",
    margin: "0",
    fontWeight: "300",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "40px 0",
  },
  searchBar: {
    display: "flex",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "25px",
    overflow: "hidden",
    width: "400px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  input: {
    border: "none",
    padding: "15px 20px",
    width: "100%",
    fontSize: "16px",
    outline: "none",
    background: "transparent",
    color: "white",
  },
  button: {
    background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    padding: "15px 25px",
    cursor: "pointer",
    color: "white",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  searchIcon: {
    fontSize: "16px",
  },
  musicContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  song: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "20px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
    marginBottom: "15px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
  img: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  playIcon: {
    fontSize: "3rem",
    color: "white",
  },
  songInfo: {
    textAlign: "left",
    marginBottom: "15px",
  },
  title: {
    fontSize: "1.3rem",
    margin: "0 0 12px 0",
    color: "white",
    fontWeight: "600",
    lineHeight: "1.3",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  artist: {
    fontSize: "1rem",
    margin: "8px 0",
    color: "#ff6b6b",
  },
  album: {
    fontSize: "0.9rem",
    margin: "8px 0",
    color: "#48dbfb",
  },
  genre: {
    fontSize: "0.8rem",
    margin: "8px 0",
    color: "#feca57",
    fontStyle: "italic",
  },
  label: {
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
  },
  audioContainer: {
    marginTop: "15px",
  },
  audio: {
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
  },
  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.8)",
  },
  noResults: {
    padding: "60px 20px",
    textAlign: "center",
  },
  noResultsIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
    opacity: "0.7",
  },
  noResultsText: {
    fontSize: "1.3rem",
    color: "white",
    marginBottom: "10px",
  },
  noResultsSubtext: {
    fontSize: "1rem",
    color: "rgba(255, 255, 255, 0.6)",
  },
};