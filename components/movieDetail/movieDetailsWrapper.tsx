/* eslint-disable no-void */
'use client';

import { HeartIcon } from '@/components/icons';
import { movieExistsInWatchlist } from '@/services/db';
import { useWatchlistStore } from '@/store/watchlist';
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Button,
  Spinner,
} from '@/utils/nextui';
import { useEffect } from 'react';

interface MovieDetailsWrapperProps {
  id: number;
  title: string;
  poster: string;
  year: number;
  children: React.ReactNode;
}

export default function MovieDetailsWrapper({
  id,
  title,
  poster,
  year,
  children,
}: MovieDetailsWrapperProps): JSX.Element {
  const {
    watchlistId,
    isLoading,
    addMovie,
    added,
    setAdded,
    isSuccess,
    removeMovie,
  } = useWatchlistStore((state) => ({
    watchlistId: state.watchlistId,
    isLoading: state.isLoading,
    addMovie: state.addMovie,
    added: state.added,
    setAdded: state.setAdded,
    isSuccess: state.isSuccess,
    removeMovie: state.removeMovie,
  }));
  useEffect(() => {
    async function movieExists(): Promise<void> {
      if (watchlistId != null) {
        const isExists = await movieExistsInWatchlist(
          watchlistId,
          id
        );
        setAdded(isExists);
      }
    }
    void movieExists();
  }, [watchlistId, added, setAdded, id]);

  return (
    <Card>
      <CardHeader style={{ justifyContent: 'space-between' }}>
        <h1>{title}</h1>
        {(watchlistId != null) && (
          <Button
            size='sm'
            color='secondary'
            variant='bordered'
            disabled={isLoading}
            onPress={(e) =>
              void (async () => {
                if (added === false)
                  await addMovie(id, title, year, poster);
                else await removeMovie(id);
              })()
            }
          >
            {isLoading ? (
              <Spinner color='secondary' className='p-1' />
            ) : (
              <>
                {added ?? false ? (
                  <span>Remove from Watchlist</span>
                ) : (
                  <span>Add to Watchlist</span>
                )}
                <HeartIcon
                  className={
                    added ?? false
                      ? '[&>path]:stroke-transparent'
                      : ''
                  }
                  fill={added ?? false ? 'currentColor' : 'none'}
                />
              </>
            )}
          </Button>
        )}
      </CardHeader>
      {!isSuccess && (
        <span>
          Error {added === true ? 'deleting' : 'adding'} movie to
          watchlist
        </span>
      )}
      <CardBody className='gap-6'>
        <div className='w-full'>
          <Image src={poster} alt={title} />
        </div>
        {children}
      </CardBody>
    </Card>
  );
}
