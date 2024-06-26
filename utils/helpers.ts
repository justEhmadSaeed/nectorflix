import {
  type Movie,
  type MoviesResponse,
  type MovieDetails,
  type MovieDetailsResponse,
} from '@/interfaces';

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

export const parseMovieDetailsResponse = (
  response: MovieDetailsResponse
): MovieDetails => {
  return {
    tmdbId: response.id,
    title: response.title,
    overview: response.overview,
    poster: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
    releaseDate: response.release_date,
    voteAverage: response.vote_average,
    genres: response.genres,
    productionCompanies: response.production_companies,
  };
};
