import { Movie, MoviesResponse } from '@/interfaces';
import axios from 'axios';

const BASE_TMDB_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdbClient = axios.create({
  baseURL: BASE_TMDB_URL,
});

tmdbClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: TMDB_API_KEY,
  };
  return config;
});

export const getUpcomingMovies =
  async (): Promise<MoviesResponse> => {
    const response = await tmdbClient.get('movie/upcoming');
    return response.data;
  };

export const searchMovies = async (
  query?: string
): Promise<MoviesResponse> => {
  const response = await tmdbClient.get('search/movie', {
    params: {
      query,
    },
  });
  return response.data;
};

export const getMovieDetails = async (
  tmdbId: number
): Promise<Movie> => {
  const response = await tmdbClient.get(`movie/${tmdbId}`);
  return response.data;
};
