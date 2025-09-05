import React, { useState } from "react";
import { login, logout, getRole } from "./auth";

const MusicLibrary = React.lazy(() => import("music_library/App"));

const initialSongs = [
  { id: 1, title: "Song A", artist: "Artist 1", album: "Album X" },
  { id: 2, title: "Song B", artist: "Artist 2", album: "Album Y" },
  { id: 3, title: "Song C", artist: "Artist 1", album: "Album Z" },
  { id: 4, title: "Song D", artist: "Artist 2", album: "Album q"},
];

function App() {
  const [role, setRole] = useState(getRole());
  const [songs, setSongs] = useState(initialSongs);

  // Add Song
  const addSong = () => {
    const newSong = {
      id: Date.now(),
      title: `Song ${songs.length + 1}`,
      artist: "New Artist",
      album: "New Album",
    };
    setSongs((prev) => [...prev, newSong]);
  };

  // Delete Song
  const deleteSong = (id) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
  };

  const handleLogin = (r) => {
    login(r);
    setRole(r);
  };

  const handleLogout = () => {
    logout();
    setRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          🎵 Main App (Container)
        </h1>

        {!role ? (
          <div className="flex flex-col space-y-3">
            <p className="text-gray-700 text-center">Select role to login:</p>
            <button
              onClick={() => handleLogin("admin")}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Login as Admin
            </button>
            <button
              onClick={() => handleLogin("user")}
              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Login as User
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <p className="text-center text-gray-800">
              Logged in as: <b>{role}</b>
            </p>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Logout
            </button>

            <React.Suspense fallback={<p className="text-center">Loading Music Library...</p>}>
              <MusicLibrary
                songs={songs}
                addSong={addSong}
                deleteSong={deleteSong}
                role={role}
              />
            </React.Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
