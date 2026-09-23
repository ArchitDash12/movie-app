# 🍿 CinePulse — Modern Movie Discovery App

<p align="center">
  <img src="./public/hero-img.svg" alt="CinePulse Banner" width="700" />
</p>

<p align="center">
  <strong>Find movies you'll enjoy without the hassle. Real-time search, live trending rankings, and rich movie metrics.</strong>
</p>

<p align="center">
  <a href="#-live-demo"><img src="https://img.shields.io/badge/Demo-Live%20Preview-blue?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.3-646C9F?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Appwrite-Cloud-FD366E?style=for-the-badge&logo=appwrite&logoColor=white" alt="Appwrite" />
  <img src="https://img.shields.io/badge/TMDB_API-v3-01D277?style=for-the-badge&logo=the-movie-database&logoColor=white" alt="TMDB" />
</p>

---

## 🌐 Live Demo

<!-- PLACEHOLDER FOR LIVE DEPLOYMENT LINK -->
> 🚀 **Live Deployment**: *Deployment link coming soon!*  
> [![Visit Live App](https://img.shields.io/badge/Live_Site-Click_Here-success?style=for-the-badge&logo=googlechrome&logoColor=white)](YOUR_DEPLOYMENT_URL_HERE)

*(Provide your production URL to update this section)*

---

## 📖 Overview

**CinePulse** is a responsive, fast web application for discovering trending and popular movies. Powered by **The Movie Database (TMDB)** API for live movie data and **Appwrite Cloud** as a serverless backend-as-a-service (BaaS), the application dynamically tracks search queries and curates a real-time **Top 5 Trending Movies** leaderboard based on actual user activity.

Built with **React 19**, **Vite**, and **Tailwind CSS v4**, CinePulse delivers smooth animations, dark-mode aesthetics, debounced API calls for optimal performance, and robust error handling.

---

## ✨ Key Features

- **🎬 Real-Time Movie Discovery**: Explores the latest and most popular movies from TMDB's extensive catalog.
- **⚡ Smart Debounced Search**: Implements a 500ms debounce using `react-use` to minimize API queries while preserving a responsive typing experience.
- **🔥 Dynamic Trending Leaderboard**:
  - Automatically records and increments user search queries in an **Appwrite** NoSQL database.
  - Computes and showcases the **Top 5 trending movies** based on global search counts with custom ranked badges.
- **🎨 Modern Dark UI / UX**:
  - Cyberpunk-inspired dark theme with hero backdrop patterns and gradients.
  - Smooth hover states, glowing accents, and responsive card grids.
- **🛡️ Secure Architecture**: Sensitive credentials (TMDB token, Appwrite project/database/collection IDs) isolated using Vite environment variables.
- **📱 Fully Responsive**: Fluid multi-breakpoint layout tested across mobile, tablet, and widescreen desktop displays.
- **⏳ Graceful State Management**: Informative loading spinners, fallback posters (`No-Poster.svg`), and user-friendly error banners.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | Component architecture, state hooks, fast rendering |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) | Lightning-fast HMR and optimized production bundling |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first styling with custom `@theme` variables |
| **Backend-as-a-Service** | [Appwrite Cloud](https://appwrite.io/) | Serverless document database to store search metrics & ranking |
| **External API** | [TMDB API v3](https://developer.themoviedb.org/docs) | Movie metadata, ratings, release dates, and posters |
| **Utilities** | [react-use](https://github.com/streamich/react-use) | Custom hooks including `useDebounce` |

---

## 🏗️ Architecture & Data Flow

```
[ User Searches Movie ]
         │
         ▼
[ useDebounce (500ms) ] ─────────► [ TMDB API: /search/movie ]
         │                                    │
         │ (First matching result)            ▼
         ▼                             [ Render Movie Cards ]
[ Appwrite Database ]
   ├─ Check if query exists
   ├─ Update search count (count + 1)
   └─ Store movie_id & poster_url
         │
         ▼
[ Top 5 Query: Order by count DESC ] ──► [ Render Trending Leaderboard ]
```

---

## 🚀 Getting Started

Follow these instructions to set up CinePulse locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- A free account on [The Movie Database (TMDB)](https://www.themoviedb.org/)
- A free account on [Appwrite Cloud](https://cloud.appwrite.io/)

### 1. Clone the Repository

```bash
git clone https://github.com/ArchitDash12/movie-app.git
cd movie-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your credentials:

```env
# TMDB API Read Access Token (Bearer Token)
VITE_TMDB_API_KEY=your_tmdb_read_access_token

# Appwrite Cloud Backend Configuration
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

### 4. Setup Appwrite Database

1. In your **Appwrite Console**, create a new project.
2. Under **Databases**, create a new Database.
3. Within that Database, create a new Collection (e.g., `metrics`).
4. Add the following attributes to your collection:
   - `searchTerm` (String, Required, Size: 255)
   - `count` (Integer, Required, Default: 1)
   - `movie_id` (Integer, Required)
   - `poster_url` (String / URL, Required, Size: 500)
5. Under **Settings** > **Permissions**, grant `Any` (or `Users`) permission for **Read**, **Create**, and **Update**.

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Project Structure

```text
movie-app/
├── public/                  # Static assets & icons
│   ├── BG.svg               # Background hero gradient
│   ├── hero-img.svg         # Hero banner graphic
│   ├── logo.svg             # Application logo
│   ├── No-Poster.svg        # Placeholder image for missing posters
│   ├── search.svg           # Search icon
│   └── star.svg             # Rating star icon
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── MovieCard.jsx    # Movie card item with poster, rating, language, year
│   │   ├── Search.jsx       # Controlled search bar component
│   │   └── Spinner.jsx      # Loading animation component
│   ├── App.css              # Extra component-level styles
│   ├── App.jsx              # Main application logic & layout
│   ├── appwrite.js          # Appwrite client & database handlers
│   ├── index.css            # Tailwind CSS configuration & custom theme
│   └── main.jsx             # React entry point
├── .env.example             # Template for required environment variables
├── .gitignore               # Ignored files (secrets, builds, node_modules)
├── index.html               # HTML template
├── package.json             # Scripts & dependencies
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with hot-reload |
| `npm run build` | Compiles and bundles production-ready assets to `dist/` |
| `npm run preview` | Locally serves the production build for testing |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |

---

## 🤝 Contributing

Contributions, issues, and feature suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/ArchitDash12">ArchitDash12</a>
</p>
