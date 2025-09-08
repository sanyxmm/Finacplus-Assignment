import React, { createContext, useState } from "react";
import { mockSongs } from "./data/mockSongs";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [songs, setSongs] = useState(mockSongs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const credentials = {
    admin: { id: "admin", password: "admin123" },
    user: { id: "user", password: "user123" },
  };

  const handleDeleteSong = (id) => {
    setSongs(songs.filter((s) => s.id !== id));
  };

  const handleAddSong = (newSong) => {
    setSongs([
      ...songs,
      { ...newSong, id: Math.random().toString(36).substr(2, 9) },
    ]);
  };

  const handleLogin = () => {
    if (
      username === credentials.admin.id &&
      password === credentials.admin.password
    ) {
      setRole("admin");
      setError("");
    } else if (
      username === credentials.user.id &&
      password === credentials.user.password
    ) {
      setRole("user");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setRole(null);
    setUsername("");
    setPassword("");
  };

  return (
    <AppContext.Provider
      value={{
        songs,
        setSongs,
        username,
        setUsername,
        password,
        setPassword,
        role,
        error,
        handleLogin,
        handleLogout,
        handleDeleteSong,
        handleAddSong,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
