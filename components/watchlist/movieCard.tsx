/* eslint-disable no-void */
'use client';
import type { Movie } from '@/interfaces';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Spinner,
} from '@/utils/nextui';
import { HeartIcon } from '@/components/icons';
import Link from 'next/link';
import { useWatchlistStore } from '@/store/watchlist';

export default function MovieCard({
  movie,
}: {
  movie: Movie;
}): JSX.Element {
  const { title, poster, tmdbId } = movie;
  const { removeMovie, isLoading } = useWatchlistStore((state) => ({
    removeMovie: state.removeMovie,
    isLoading: state.isLoading,
  }));

  return (
    <Card>
      <CardBody className='gap-6'>
        <Link href={`/movie/${tmdbId}`}>
          <Image src={poster} alt={title} className='h-96' isZoomed />
        </Link>
      </CardBody>
      <CardHeader style={{ justifyContent: 'space-between' }}>
        <h1>{title}</h1>
        <Button
          size='sm'
          color='secondary'
          variant='bordered'
          disabled={isLoading}
          onClick={(e) =>
            void (async () => {
              await removeMovie(tmdbId);
            })()
          }
        >
          {isLoading ? (
            <Spinner color='secondary' className='p-1' />
          ) : (
            <>
              <span>Remove</span>
              <HeartIcon
                className={'[&>path]:stroke-transparent'}
                fill={'currentColor'}
              />
            </>
          )}
        </Button>
      </CardHeader>
    </Card>
  );
}
