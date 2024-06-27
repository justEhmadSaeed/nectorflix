import Watchlist from '@/components/watchlist/watchlist';
import { getMoviesByWatchlistId } from '@/services/db';

export default async function WatchlistPage({
  params,
}: {
  params: { watchId: string };
}): Promise<JSX.Element> {
  const watchlistId = parseInt(params?.watchId);
  const watchlist = await getMoviesByWatchlistId(watchlistId);

  return (
    <div>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className='flex flex-wrap'>
          <Watchlist
            watchlist={watchlist}
            watchlistId={watchlistId}
          />
        </div>
      )}
    </div>
  );
}
