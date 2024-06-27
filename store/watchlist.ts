/* eslint-disable no-console */
import type { Movie } from '@/interfaces';
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from '@/services/db';
import { create } from 'zustand';

interface WatchlistStore {
  watchlistId: number | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  added: boolean | undefined;
  setAdded: (added: boolean) => void;
  watchlistMovies: Movie[];
  setWatchlistMovies: (watchlistMovies: Movie[]) => void;
  addMovie: (
    tmdbId: number,
    title: string,
    year: number,
    poster: string
  ) => Promise<void>;
  removeMovie: (tmdbId: number) => Promise<void>;
  setWatchlistId: (watchlistId: number | undefined) => void;
}
export const useWatchlistStore = create<WatchlistStore>(
  (set, get) => ({
    watchlistId: undefined,
    isLoading: true,
    isSuccess: true,
    added: undefined,
    setAdded: (added: boolean) => {
      set(() => ({ added, isLoading: false }));
    },
    watchlistMovies: [],
    setWatchlistMovies: (watchlistMovies: Movie[]) => {
      set(() => ({ watchlistMovies, isLoading: false }));
    },
    addMovie: async (tmdbId, title, year, poster) => {
      try {
        set(() => ({ isLoading: true }));
        const watchlistId = get().watchlistId;

        if (watchlistId == null) {
          set(() => ({
            isLoading: false,
            isSuccess: false,
          }));
          return;
        }

        const isSuccess = await addMovieToWatchlist(
          watchlistId,
          tmdbId,
          title,
          year,
          poster
        );
        set(() => ({
          isLoading: false,
          isSuccess,
          added: true,
          watchlistMovies: get().watchlistMovies.concat({
            tmdbId,
            title,
            year,
            poster,
          }),
        }));
      } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        set(() => ({ isLoading: false, isSuccess: false }));
      }
    },
    removeMovie: async (tmdbId) => {
      try {
        set(() => ({ isLoading: true }));
        const watchlistId = get().watchlistId;

        if (watchlistId == null) {
          set(() => ({
            isLoading: false,
            isSuccess: false,
          }));
          return;
        }

        const isSuccess = await removeMovieFromWatchlist(
          watchlistId,
          tmdbId
        );
        set(() => ({
          isLoading: false,
          isSuccess,
          added: false,
          watchlistMovies: get().watchlistMovies.filter(
            (movie) => movie.tmdbId !== tmdbId
          ),
        }));
      } catch (error) {
        console.error('Error removing movie from watchlist:', error);
        set(() => ({ isLoading: false, isSuccess: false }));
      }
    },
    setWatchlistId: (watchlistId) => {
      set(() => ({ watchlistId, watchlistMovies: [] }));
    },
  })
);
