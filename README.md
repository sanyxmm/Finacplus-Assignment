`# Finacplus-Assignment`

A **React-based Music Library** project demonstrating **Microfrontend architecture**, **role-based authentication**, and JavaScript array functions like `map`, `filter`, and `reduce`.

The project is split into:
1. **Main App** – acts as the container
2. **Music Library** – a separate microfrontend dynamically loaded using Module Federation

---

`## 🚀 Features`

- Display a list of songs in a clean UI
- Filter, sort, and group songs by **Album**, **Artist**, and **Title**
- Add/Delete songs (**Admin only**)
- Role-based authentication (Admin/User) using mock JWT
- Microfrontend architecture with dynamic loading
- Shared state updates between Admin and User views

---

`## 💻 How to Run Locally`

`### 1. Clone the repository`

```bash
git clone https://github.com/sanyxmm/Finacplus-Assignment.git
cd Finacplus-Assignment
```

`### 2. Install dependencies`

**Main App:**
```bash
cd main-app
npm install
```

**Music Library:**
```bash
cd ../music-library
npm install
```

`### 3. Start the apps`

**Start Music Library first (remote):**
```bash
cd music-library
npm run dev
# Runs on http://localhost:5001
```

**Then start Main App (container):**
```bash
cd ../main-app
npm run dev
# Runs on http://localhost:5000
```

Open [http://localhost:5000](http://localhost:5000) to see the main app loading the music library dynamically.

---

`## 🌐 Live Demo`

- **Main App:** [Add Vercel Link Here]
- **Music Library Microfrontend:** [Add Vercel Link Here]

The main app dynamically loads the music library from its deployed URL.

---

`## 🧑‍💻 Credentials for Demo`

| Role  | Login Method        | Permissions                           |
|-------|---------------------|---------------------------------------|
| Admin | Click "Login as Admin" | Add and delete songs                  |
| User  | Click "Login as User"  | View, filter, sort, and group songs   |

---

`## 🛠 How It Works`

`### Microfrontend (Module Federation)`

- **Music Library** is built as a remote app (`remoteEntry.js`) using Vite + `@originjs/vite-plugin-federation`
- **Main App** loads it dynamically:
  ```javascript
  const MusicLibrary = React.lazy(() => import("music_library/App"));
  ```
- Shared dependencies (`react` and `react-dom`) are not duplicated

`### Role-Based Authentication`

- Uses mock JWT in-memory (no backend required)
- Role is stored in `localStorage` or React state
- Conditional rendering ensures:
  - **Admin:** Can add/delete songs
  - **User:** Can only view songs
- UI controls for adding/deleting are dynamically shown/hidden based on role

---

`## ⚙️ Technical Stack`

- **Frontend:** React, React Hooks, Vite
- **Microfrontend:** Module Federation (Vite plugin)
- **State Management:** React `useState` and `useReducer`
- **Styling:** Plain CSS
- **JavaScript Methods:** `map`, `filter`, `reduce`
- **Authentication:** Mock JWT in-memory

---

`## 📁 Project Structure`

```
Finacplus-Assignment/
├── main-app/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
└── music-library/
    ├── src/
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

---

`## 🎯 Key JavaScript Array Methods Used`

- **`map()`** - Transform song data for display
- **`filter()`** - Filter songs by album, artist, or title
- **`reduce()`** - Group songs by categories and calculate statistics

---

`## 🔧 Development Notes`

1. **Music Library** must be started before **Main App** for Module Federation to work
2. Both apps run on different ports (5001 and 5000)
3. Mock authentication persists across page refreshes using `localStorage`
4. State management is handled within each microfrontend independently

---

`## 📝 License`

This project is open source and available under the [MIT License](LICENSE).
