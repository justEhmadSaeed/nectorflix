import { type Movie } from '@/interfaces';
import { title } from './primitives';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';

interface MoviesGridProps {
  heading: string;
  movies: Movie[];
}

export default function MoviesGrid({
  movies,
  heading,
}: MoviesGridProps): JSX.Element {
  return (
    <div className='w-full'>
      <h2 className={title({ size: 'sm', className: 'my-4' })}>
        {heading.toUpperCase()}
      </h2>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 py-3'>
        {movies.map((movie) => (
          <div key={movie.tmdbId} className='relative'>
            <Link href={`/movie/${movie.tmdbId}`}>
              <Image
                isZoomed
                src={movie.poster}
                alt={movie.title}
                className='w-full h-full object-cover rounded-lg'
              />
              <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg z-10'>
                <p className='text-white text-center'>
                  {movie.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
