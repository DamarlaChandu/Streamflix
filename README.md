StreamFlix - The Cinematic Universe

A Netflix-style movie streaming app built with React + Vite, featuring 50 curated movies across multiple genres.

🔗 Live Demo & Project Resources

🌐 Live Project: https://streamflix-six-wheat.vercel.app/

💻 Code Demonstration (Video): https://drive.google.com/file/d/10_jbdYoam_kJaBVWr5e-suQXWiIJpVpN/view?usp=sharing

🎥 Project Demonstration Video: https://drive.google.com/file/d/1EsWGtl4HhmtbnmQP4hCay6rNg0vQjeNW/view?usp=sharing

🚀 Features

Hero Banner - Featured movie with autoplay-style presentation

Category Rows - Horizontal scrolling rows organized by genre (Action, Sci-Fi, Anime, Horror, Romance, Thriller, Kids, Bollywood, Tollywood, Drama)

Real-time Search - Search page with overlay suggestion dropdown

Movie Details - Comprehensive movie information page with trailer, cast, director, year, rating, and description

Watchlist - Save movies to watchlist using LocalStorage

Trailer Modal - YouTube trailer popup modal

Responsive Design - Fully responsive UI with hover zoom/fade transitions

Dark Theme - Netflix-inspired dark UI with smooth animations

🛠️ Tech Stack

React 18 - UI library

Vite - Build tool and dev server

React Router DOM - Client-side routing

Tailwind CSS - Utility-first CSS framework

Framer Motion - Animation library

LocalStorage - Watchlist persistence

📦 Installation

Install dependencies:

npm install

Start development server:

npm run dev

📁 Project Structure
src/
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ HeroBanner.jsx
 │   ├─ MovieRow.jsx
 │   ├─ MovieCard.jsx
 │   ├─ SearchBar.jsx
 │   └─ TrailerModal.jsx
 │
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ MovieDetails.jsx
 │   ├─ Watchlist.jsx
 │   └─ SearchResults.jsx
 │
 ├─ data/
 │   ├─ movies.js          # main dataset (1–50)
 │   ├─ moviesExtra.js     # extended dataset (51–77+)
 │   └─ allMovies.js       # merged dataset for entire app
 │
 ├─ context/
 │   └─ WatchlistContext.jsx
 │
 ├─ App.jsx
 ├─ main.jsx
 └─ index.css

🎬 Movie Dataset

Includes 50+ curated movies across genres:

Marvel/Avengers series

Christopher Nolan films

Fast & Furious series

Horror classics (Conjuring, Annabelle, Exorcist)

Studio Ghibli & Anime favorites

Disney/Pixar animated films

Bollywood blockbusters

Tollywood epics

Thriller masterpieces

Romance classics

Action blockbusters

Drama & Oscar winners

🎨 Features in Detail
Home Page

Hero banner with featured movie

Genre-based movie rows with horizontal scrolling

Search bar with live suggestions

Movie Details

Full movie information

Trailer playback

Cast details

Similar movie recommendations

Add/remove from watchlist

Watchlist

View saved movies

Remove movies

Clean empty-state UI

Search

Real-time search

Search by title, cast, director, genre

Grid-based results

🎯 Usage

Browse movies by genre

Open any movie card for details

Add movies to your watchlist

Search for movies instantly

Watch trailers in popup modal

📝 License

This project is for educational purposes.


Build for production:

npm run build
