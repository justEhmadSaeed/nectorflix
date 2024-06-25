'use client';
import MoviesGrid from '@/components/moviesGrid';
import SearchInput from '@/components/searchInput';
import { Movie } from '@/interfaces';
import { parseMoviesResponse } from '@/utils/helpers';
import axios from 'axios';
import React, { useState } from 'react';

export default function SearchMovies({
  upcomingMovies,
}: {
  upcomingMovies: Movie[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchTimeout, setSearchTimeout] =
    useState<NodeJS.Timeout>();

  const handleSearch = async (query: string) => {
    clearTimeout(searchTimeout);
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    setSearchTimeout(
      setTimeout(async () => {
        const response = await axios.get(
          `/api/searchMovies?query=${query}`
        );
        const searchedMovies = parseMoviesResponse(response.data);
        setSearchResults(searchedMovies);
      }, 500)
    );
  };

  const moviesToDisplay =
    searchResults.length > 0 ? searchResults : upcomingMovies;
  return (
    <div className='flex flex-col items-center gap-3 w-full lg:w-2/3'>
      <SearchInput value={searchQuery} onChange={handleSearch} />
      {searchQuery && searchResults.length === 0 && (
        <p className='text-center text-default-500'>
          No movies found!
        </p>
      )}
      <MoviesGrid movies={moviesToDisplay} />
    </div>
  );
}
