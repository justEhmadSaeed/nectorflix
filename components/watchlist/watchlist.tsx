'use client';
import MovieCard from '@/components/watchlist/movieCard';
import type { Movie } from '@/interfaces';
import { useWatchlistStore } from '@/store/watchlist';
import { useEffect } from 'react';

export default function Watchlist({
  watchlist,
}: {
  watchlist: Movie[];
}): JSX.Element {
  const { watchlistMovies, setWatchlistMovies } = useWatchlistStore(
    (state) => ({
      watchlistMovies: state.watchlistMovies,
      setWatchlistMovies: state.setWatchlistMovies,
    })
  );

  useEffect(() => {
    setWatchlistMovies(watchlist);
  }, [setWatchlistMovies, watchlist]);
  return (
    <div className='flex flex-wrap'>
      {watchlistMovies.map((movie) => (
        <MovieCard key={movie.tmdbId} movie={movie} />
      ))}
    </div>
  );
}
