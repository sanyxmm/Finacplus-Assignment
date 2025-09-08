`# Finacplus-Assignment`

A **React-based Music Library** project demonstrating **Microfrontend architecture**, **role-based authentication**, and JavaScript array functions like `map`, `filter`, and `reduce`.

The project is split into:
1. **Main App** – acts as the container
2. **Music Library** – a separate microfrontend dynamically loaded using Module Federation

---
`## 🌐 Live Demo`

- **Main App:** (https://mainapp-taupe.vercel.app/)]
- **Music Library Microfrontend:** (https://musicapp-nine-alpha.vercel.app/)

The main app dynamically loads the music library from its deployed URL.

---

`## 🧑‍💻 Credentials for Demo`

| Role  |     Username        |              Password                 |
|-------|---------------------|---------------------------------------|
| Admin |      admin          |             admin123                  |
| User  |      user           |             user123                   |

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
npm run build
npm run preview -- --port 5001
# Runs on http://localhost:5001
```

**Then start Main App (container):**
```bash
cd main-app
npm run dev
# Runs on http://localhost:5000
```

Open [http://localhost:5000](http://localhost:5000) to see the main app loading the music library dynamically.

---

`## 🛠 How It Works`

`### Microfrontend (Module Federation)`

- **Music Library** is built as a remote app (`remoteEntry.js`) using Vite + `@originjs/vite-plugin-federation`
- **Main App** loads it dynamically:
  ```javascript
  const MusicLibrary = React.lazy(() => import("music_library/App"));
  ```
- Shared dependencies (`react`, `react-dom` and 'tailwindcss) are not duplicated
