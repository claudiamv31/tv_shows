export const IMAGE_URL_RES = 'https://image.tmdb.org/t/p/w200';
export const NO_PIC =
  'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg';
export const IMAGE_URL_SHOW = 'https://image.tmdb.org/t/p/w300';
export const API_URL = 'https://api.themoviedb.org/3/';
// CRA exposes REACT_APP_* values to the browser. Keep the token out of source
// control and rotate it if it has ever been committed or shared publicly.
export const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN || '';
export const API_HEADERS = TMDB_API_TOKEN
  ? { Authorization: `Bearer ${TMDB_API_TOKEN}` }
  : {};
export const API_HEADER =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjQ2MjdiNmJlODMwNTg0YWVjNGQ5NzczMGQ2YzAyYSIsIm5iZiI6MTY2MDkyOTQ2Ny4wMzksInN1YiI6IjYyZmZjNWJiMjQ1ZGJlMDA3YWZjNjMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LCBWJ1vgnLGEgJL2eQz0BJgQykj2iMDGo0YVu42bZw8';
export const NUM_SHOWS_TRENDING = 10;
export const API_SERVICE_URL = 'http://localhost:5031/api/Trending';

export const PROVIDERS_URL = {
  Netflix: 'www.netflix.com/',
  'Apple TV Plus': 'tv.apple.com/',
  Hulu: 'www.hulu.com/',
  fuboTV: 'www.fubo.tv/',
  'Disney Plus': 'www.disneyplus.com/',
  Max: 'play.max.com',
  'Pime Video': 'www.primevideo.com',
};
