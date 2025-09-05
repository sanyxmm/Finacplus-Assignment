import { useState } from "react";
import { Play, MoreVertical, Trash2, Clock } from "lucide-react";

export const SongCard = ({ song, userRole, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200">
      

      <div className="relative w-full">
        <img
          src={song.albumArt}
          alt={`${song.album} cover`}
          className="w-full aspect-square object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform">
  <Play className="w-6 h-6" />
</button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-lg group-hover:text-blue-600 transition-colors">
              {song.title}
            </h3>
            <p className="text-sm text-gray-500 truncate">{song.artist}</p>
          </div>

      
          {userRole === "admin" && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-100"
              >
                <MoreVertical className="w-5 h-5 text-gray-700" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  <button
                    onClick={() => {
                      onDelete(song.id);
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Song
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

       
        <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
          <span className="truncate">{song.album}</span>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <Clock className="w-3 h-3" />
            <span>{song.duration}</span>
          </div>
        </div>

        <div className="text-xs text-gray-400">{song.year}</div>
      </div>
    </div>
  );
};
