import React, { useState ,Suspense } from "react";
import { mockSongs } from './data/mockSongs';

import "./index.css";

const MusicLibrary = React.lazy(() => import("music_library/App"));

export default function App() {
  const [songs,setSongs] = useState(mockSongs)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
  const [error, setError] = useState("");

  const credentials = {
    admin: { id: "admin", password: "admin123" },
    user: { id: "user", password: "user123" },
  };
 const handleDeleteSong = (id) => setSongs(songs.filter((s) => s.id !== id));
 
   const handleAddSong = (newSong) => {
     setSongs([...songs, { ...newSong, id: Math.random().toString(36).substr(2, 9) }]);
   };
  const handleLogin = () => {
    if (username === credentials.admin.id && password === credentials.admin.password) {
      setRole("admin");
      setError("");
    } else if (username === credentials.user.id && password === credentials.user.password) {
      setRole("user");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };
  const handleLogout = () => {
    setRole(null);
  };


  return (
    <div>
         {!role?(<div className="flex items-center justify-center h-[100vh] w-[100vw] bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>):(<div className="pt-10 px-6">
        <Suspense fallback={<div>Loading music library...</div>}>
          <MusicLibrary 
          userRole={role} 
          handleLogout={handleLogout} 
          songs={songs} 
          handleDeleteSong={handleDeleteSong}
          handleAddSong={handleAddSong}
          />
        </Suspense>
      </div>)}
    </div>
   
  );
}
