StreamFlix - The Cinematic Universe

A Netflix-style movie streaming app built with React + Vite, featuring 50 curated movies across multiple genres.

🔗 Live Demo & Resources

🌐 Live Website: https://streamflix-six-wheat.vercel.app/

💻 Code Demonstration Video: https://drive.google.com/file/d/10_jbdYoam_kJaBVWr5e-suQXWiIJpVpN/view?usp=sharing

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

React 18

Vite

React Router DOM

Tailwind CSS

Framer Motion

LocalStorage

📦 Installation

Install dependencies:

npm install


Start development server:

npm run dev


Build for production:

npm run build

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

The app includes 50 carefully curated movies across various genres:

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

Search bar in navbar with live suggestions

Movie Details

Full movie information

Trailer playback

Cast information

Similar movies recommendations

Add/remove from watchlist

Watchlist

View all saved movies

Remove movies

Beautiful empty state

Search

Real-time search across titles, genres, directors, and cast

Grid-based results page

Quick navigation to movie details

🎯 Usage

Browse movies by genre

Click on any movie card to view details

Add movies to your watchlist

Search for specific movies

Watch trailers in the popup modal

📝 License

This project is for educational purposes.
