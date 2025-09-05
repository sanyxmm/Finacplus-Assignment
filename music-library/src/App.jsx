import React from "react";

function MusicLibrary({ songs, addSong, deleteSong, role }) {
  // Group by Artist
  const groupedByArtist = songs.reduce((acc, song) => {
    acc[song.artist] = acc[song.artist] || [];
    acc[song.artist].push(song);
    return acc;
  }, {});

  return (
    <div className="mt-6 bg-white  shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-indigo-600 mb-4 text-center">
        🎼 Music Library
      </h2>

      {role === "admin" && (
        <button
          onClick={addSong}
          className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          ➕ Add Song
        </button>
      )}

      <div className="space-y-6">
        {Object.keys(groupedByArtist).map((artist) => (
          <div key={artist} className="border p-4 rounded">
            <h3 className="font-semibold text-gray-700">{artist}</h3>
            <ul className="list-disc list-inside">
              {groupedByArtist[artist].map((song) => (
                <li
                  key={song.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {song.title} — <i>{song.album}</i>
                  </span>
                  {role === "admin" && (
                    <button
                      onClick={() => deleteSong(song.id)}
                      className="ml-4 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicLibrary;
