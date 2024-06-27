import { type MoviesResponse, type Movie } from '@/interfaces';
import { parseMoviesResponse } from '@/utils/helpers';
import axios from 'axios';
import { create } from 'zustand';

interface MoviesStore {
  query: string;
  searchedMovies: Movie[];
  searchTimeout: NodeJS.Timeout | undefined;
  isLoading: boolean;
  handleQueryChange: (query: string) => Promise<void>;
}

export const useMoviesStore = create<MoviesStore>((set, get) => ({
  query: '',
  searchedMovies: [],
  searchTimeout: undefined,
  isLoading: false,
  handleQueryChange: async (query: string) => {
    clearTimeout(get().searchTimeout);
    set(() => ({ query, isLoading: true }));
    
    if (query.length === 0) {
      set(() => ({ searchedMovies: [], isLoading: false }));
      return;
    }
    
    // this functionality is better suited to be implemented 
    // in a subscriber model, but for the sake of simplicity
    // and time constraints, I tended to keep it here
    set(() => ({
      searchTimeout: setTimeout(() => {
        void (async () => {
          const response = await axios.get<MoviesResponse>(
            `/api/searchMovies?query=${query}`
          );
          const searchedMovies = parseMoviesResponse(response.data);
          set(() => ({ searchedMovies, isLoading: false }));
        })();
      }, 500),
    }));
  },
}));
