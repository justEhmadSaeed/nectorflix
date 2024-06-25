import { Movie, MoviesResponse } from '@/interfaces';

export const parseMoviesResponse = (
  response: MoviesResponse
): Movie[] => {
  return response.results.map((movie) => ({
    tmdbId: movie.id,
    title: movie.title,
    year: new Date(movie.release_date).getFullYear(),
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));
};
