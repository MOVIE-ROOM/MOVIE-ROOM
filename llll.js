const API_KEY = '877552784f3b248c564470f0c4aa7f5d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';

document.addEventListener('DOMContentLoaded', () => {
  loadBillboard();
  loadMovies('upcoming', 'movieGridUpcoming');
  loadMovies('popular', 'movieGridExclusive');
  loadCategory('28', 'Action Movies', 'movieGridAction');
  loadCategory('35', 'Comedy Movies', 'movieGridComedy');

  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          searchMovies(query);
        }
      }
    });
  }
});

// Load Billboard
async function loadBillboard() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  const data = await res.json();
  const movie = data.results[0];

  const billboardMedia = document.getElementById('billboardMedia');
  billboardMedia.innerHTML = `<img src="${IMG_BASE_URL + movie.backdrop_path}" alt="${movie.title}" />`;

  const billboardContent = document.getElementById('billboardContent');
  billboardContent.querySelector('h1').textContent = movie.title;
  billboardContent.querySelector('p').textContent = movie.overview;
}

async function loadMovies(type, containerId) {
  const res = await fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}`);
  const data = await res.json();
  displayMovies(data.results, containerId);
}

async function loadCategory(genreId, containerId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await res.json();
  displayMovies(data.results, containerId);
}

async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  displayMovies(data.results, 'movieGridUpcoming');
}

function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
      <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title}" />
      <div class="overlay">
        <h2>${movie.title}</h2>
        <p>${movie.overview.substring(0, 100)}...</p>
        <div class="rating">⭐ ${movie.vote_average}</div>
      </div>
    `;
    container.appendChild(card);
  });
}


// Load movies by category (for Action, Comedy, etc.)
async function loadCategory(genreId, sectionTitle, containerId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await res.json();

  // Create section if not exist
  let section = document.getElementById(containerId);
  if (!section) {
    const container = document.createElement('section');
    container.classList.add('movie-section');
    container.innerHTML = `
      <h2>${sectionTitle}</h2>
      <div class="movie-grid" id="${containerId}"></div>
    `;
    document.querySelector('.container').appendChild(container);
    section = document.getElementById(containerId);
  }

  displayMovies(data.results, section);
}

// Load movies (for Upcoming, Popular, etc.)
async function loadMovies(type, containerId) {
  const res = await fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}`);
  const data = await res.json();
  const container = document.getElementById(containerId);
  displayMovies(data.results, container);
}

// Display movies
function displayMovies(movies, container) {
  container.innerHTML = '';
  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-card');
    movieEl.innerHTML = `
      <img src="${IMG_BASE_URL}${poster_path}" alt="${title}">
      <div class="overlay">
        <h2>${title}</h2>
        <p>⭐ ${vote_average}</p>
        <p class="description">${overview}</p>
      </div>
    `;
    container.appendChild(movieEl);
  });
}

// Search movies
async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  const container = document.getElementById('movieGridUpcoming');
  container.innerHTML = `<h3>Search Results for "${query}"</h3>`;
  displayMovies(data.results, container);
}

// Transparent navbar on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});
