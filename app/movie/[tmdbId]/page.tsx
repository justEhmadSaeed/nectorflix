import { getMovieDetails } from '@/services/tmdb';
import { parseMovieDetailsResponse } from '@/utils/helpers';

import MovieDetailsWrapper from '@/components/movieDetail/movieDetailsWrapper';
export default async function Page({
  params,
}: {
  params: { tmdbId: number };
}): Promise<JSX.Element> {
  const { tmdbId } = params;
  const movieDetailsResponse = await getMovieDetails(tmdbId);
  const movieDetails = parseMovieDetailsResponse(
    movieDetailsResponse
  );

  const {
    title: name,
    overview,
    poster,
    releaseDate,
    voteAverage,
    genres,
    productionCompanies,
  } = movieDetails;

  return (
    <MovieDetailsWrapper name={name} poster={poster}>
      <div className='flex flex-col gap-4'>
        <p>{overview}</p>
        <div className='flex items-center'>
          <p className='text-gray-400 mr-2'>Release Date:</p>
          <p>{releaseDate}</p>
        </div>
        <div className='flex items-center'>
          <p className='text-gray-400 mr-2'>Rating:</p>
          <p>{voteAverage}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-gray-300 mb-1'>Genres:</p>
          <ul className='list-disc pl-4'>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col'>
          <p className='mb-1'>Production Companies:</p>
          <p className='text-gray-400'>
            {productionCompanies
              .map((company) => company.name)
              .join(', ')}
          </p>
        </div>
      </div>
    </MovieDetailsWrapper>
    //   </CardBody>
    // </Card>
  );
}
