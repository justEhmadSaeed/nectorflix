export interface Movie {
  tmdbId: number;
  title: string;
  year: number;
  poster: string;
}

export interface MoviesResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>;
}

export interface MovieDetails {
  tmdbId: number;
  title: string;
  overview: string;
  poster: string;
  releaseDate: string;
  voteAverage: number;
  genres: Array<{ id: number; name: string }>;
  productionCompanies: Array<{ id: number; name: string }>;
}

export interface MovieDetailsResponse {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string }>;
}
