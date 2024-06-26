import { create } from 'zustand';

interface WatchlistStore {
  watchlistId: number | undefined;
  setWatchlistId: (watchlistId: number | undefined) => void;
}
export const useWatchlistStore = create<WatchlistStore>((set) => ({
  watchlistId: undefined,
  setWatchlistId: (watchlistId) => {
    set(() => ({ watchlistId }));
  },
}));
