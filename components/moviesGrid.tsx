import { Movie } from '@/interfaces';
import React from 'react';

interface MoviesGridProps {
  movies: Movie[];
}

export default function MoviesGrid({ movies }: MoviesGridProps) {
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {movies.map((movie) => (
        <div key={movie.tmdbId} className='relative'>
          <img
            src={movie.poster}
            alt={movie.title}
            className='w-full h-full object-cover rounded-lg'
          />
          <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg'>
            <p className='text-white text-center'>{movie.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
