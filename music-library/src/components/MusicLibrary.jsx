

import { useState, useMemo } from "react";
import { Search, Plus, Settings, Users, Music, LogOut } from "lucide-react";
import { SongCard } from "./SongCard";
import { AddSongDialog } from "./AddSongDialog";

export const MusicLibrary = ({userRole,handleLogout,songs,handleDeleteSong,handleAddSong}) => {
 
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [groupBy, setGroupBy] = useState("none");
  const [filterType, setFilterType] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  
  

  const filteredAndSortedSongs = useMemo(() => {
    return songs
      .filter((song) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        if (filterType === "title") return song.title.toLowerCase().includes(q);
        if (filterType === "artist") return song.artist.toLowerCase().includes(q);
        if (filterType === "album") return song.album.toLowerCase().includes(q);
        return [song.title, song.artist, song.album].some((f) =>
          f.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === "year") return b.year - a.year;
        if (sortBy === "duration") return a.duration.localeCompare(b.duration);
        return a[sortBy].localeCompare(b[sortBy]);
      });
  }, [songs, searchQuery, filterType, sortBy]);

  const groupedSongs = useMemo(() => {
    if (groupBy === "none") return { "All Songs": filteredAndSortedSongs };

    return filteredAndSortedSongs.reduce((acc, song) => {
      const key = groupBy === "album" ? song.album : song.artist;
      acc[key] = acc[key] ? [...acc[key], song] : [song];
      return acc;
    }, {});
  }, [filteredAndSortedSongs, groupBy]);

  return (
    <div className="min-h-screen bg-white">

      <div className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-md shadow-md p-6 border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Music Library
            </h1>
            <p className="text-gray-600 mt-2">
              Discover and organize your music collection
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-200 text-blue-800"
            >
              {userRole === "admin" ? <Settings className="w-4 h-4" /> : <Users className="w-4 h-4" />}
              {userRole === "admin" ? "Admin" : "User"}
            </span>
            
            <div className="flex border p-1 rounded-lg border-l-black pointer text-[14px]" onClick={handleLogout}><LogOut/> <span >&nbsp;Logout</span></div>
          </div>
        </div>

  
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search music..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="all">All Fields</option>
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
              <option value="year">Year</option>
              <option value="duration">Duration</option>
            </select>

            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="none">No Grouping</option>
              <option value="album">By Album</option>
              <option value="artist">By Artist</option>
            </select>

            {userRole === "admin" && (
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-1 px-3 py-2 text-white bg-black  text-black rounded transition"
              >
                <Plus className="w-4 h-4 text-white" /> Add Song
              </button>
            )}
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto pt-56 px-6">
        {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
          <div key={groupName} className="space-y-4">
            {groupBy !== "none" && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gray-400 rounded-full" />
                <h2 className="text-2xl font-semibold text-gray-900">{groupName}</h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {groupSongs.length} {groupSongs.length === 1 ? "song" : "songs"}
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {groupSongs.map((song) => (
                <SongCard key={song.id} song={song} userRole={userRole} onDelete={handleDeleteSong} />
              ))}
            </div>
          </div>
        ))}

        {filteredAndSortedSongs.length === 0 && (
          <div className="text-center py-16">
            <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">No songs found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "Try adjusting your search criteria" : "Your music library is empty"}
            </p>
            {userRole === "admin" && (
              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition text-gray-700"
              >
                <Plus className="w-4 h-4" /> Add Your First Song
              </button>
            )}
          </div>
        )}
      </div>

    
      <AddSongDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddSong={handleAddSong}
      />
    </div>
  );
};
