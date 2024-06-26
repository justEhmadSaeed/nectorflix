'use client';
import MoviesGrid from '@/components/moviesGrid';
import SearchInput from '@/components/searchInput';
import { type Movie } from '@/interfaces';
import { useMoviesStore } from '@/store/movie';

export default function SearchMovies({
  upcomingMovies,
}: {
  upcomingMovies: Movie[];
}): JSX.Element {
  const { searchedMovies, isLoading, query } = useMoviesStore(
    (state) => ({
      searchedMovies: state.searchedMovies,
      isLoading: state.isLoading,
      query: state.query,
    })
  );

  const moviesToDisplay =
    searchedMovies.length > 0
      ? { movies: searchedMovies, heading: 'Searched Results' }
      : { movies: upcomingMovies, heading: 'Upcoming Movies' };
  return (
    <div className='flex flex-col items-center gap-3 w-full'>
      <div className=' lg:w-2/3'>
        <SearchInput />
      </div>
      {query !== '' && !isLoading && searchedMovies.length === 0 && (
        <p className='text-center text-default-500'>
          No movies found!
        </p>
      )}
      <MoviesGrid
        heading={moviesToDisplay.heading}
        movies={moviesToDisplay.movies}
      />
    </div>
  );
}
