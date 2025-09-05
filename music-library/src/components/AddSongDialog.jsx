import { useState } from "react";

const albumOptions = ['album-1.jpg', 'album-2.jpg',' album-3.jpg', 'album-4.jpg'];

export const AddSongDialog = ({ open, onOpenChange, onAddSong }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    year: new Date().getFullYear(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.artist || !formData.album || !formData.duration) return;

    const randomAlbumArt = albumOptions[Math.floor(Math.random() * albumOptions.length)];

    onAddSong({ ...formData,  albumArt: `/${randomAlbumArt}` });

    setFormData({
      title: "",
      artist: "",
      album: "",
      duration: "",
      year: new Date().getFullYear(),
    });

    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
    
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Song</h2>
          <p className="text-sm text-gray-500">
            Fill in the details to add a new song to your library.
          </p>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-4">
      
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 text-gray-700 font-medium">
              Title
            </label>
            <input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Song title"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

       
          <div className="flex flex-col">
            <label htmlFor="artist" className="mb-1 text-gray-700 font-medium">
              Artist
            </label>
            <input
              id="artist"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              placeholder="Artist name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

        
          <div className="flex flex-col">
            <label htmlFor="album" className="mb-1 text-gray-700 font-medium">
              Album
            </label>
            <input
              id="album"
              value={formData.album}
              onChange={(e) => setFormData({ ...formData, album: e.target.value })}
              placeholder="Album name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

       
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="duration" className="mb-1 text-gray-700 font-medium">
                Duration
              </label>
              <input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="3:45"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="year" className="mb-1 text-gray-700 font-medium">
                Year
              </label>
              <input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                min="1900"
                max={new Date().getFullYear()}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

       
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2  text-black rounded hover:opacity-90"
            >
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
