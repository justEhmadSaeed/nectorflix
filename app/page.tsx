import { title } from '@/components/primitives';
import SearchMovies from './searchMovies';
import { getUpcomingMovies } from '@/services/tmdb';
import { parseMoviesResponse } from '@/utils/helpers';

export default async function Home() {
  const moviesResponse = await getUpcomingMovies();
  const moviesData = parseMoviesResponse(moviesResponse);
  return (
    <section className='flex flex-col items-center justify-center gap-4'>
      <div className='inline-block max-w-lg text-center justify-center gap-y-2'>
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: 'violet' })}>
          Movies' Experience&nbsp;
        </h1>
        <br />
        <h1 className={title()}>Unforgettably Immersive.</h1>
      </div>
      <SearchMovies upcomingMovies={moviesData} />
    </section>
  );
}
