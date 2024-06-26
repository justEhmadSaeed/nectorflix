import { Card, CardBody, CardHeader, Image } from '@/utils/nextui';

interface Movie {
  tmdbId: number;
  title: string;
  poster_path: string;
}

// const prisma = new PrismaClient();

const Watchlist: React.FC = () => {
  // const [watchlist, setWatchlist] = useState<Movie[]>([]);

  // const addToWatchlist = async (movie: Movie) => {
  //   try {
  //     const addedMovie = await prisma.movie.create({
  //       data: {
  //         tmdbId: movie.tmdbId,
  //         title: movie.title,
  //         poster: movie.poster_path, // assuming poster_path exists in your schema
  //       },
  //     });
  //     setWatchlist([...watchlist, addedMovie]);
  //   } catch (error) {
  //     console.error('Error adding movie to watchlist:', error);
  //     // Handle error appropriately (e.g., display error message to user)
  //   }
  // };

  // const removeFromWatchlist = async (tmdbId: number) => {
  //   try {
  //     await prisma.movie.delete({ where: { tmdbId } });
  //     setWatchlist(
  //       watchlist.filter((movie) => movie.tmdbId !== tmdbId)
  //     );
  //   } catch (error) {
  //     console.error('Error removing movie from watchlist:', error);
  //     // Handle error appropriately (e.g., display error message to user)
  //   }
  // };

  // useEffect(() => {
  //   const fetchWatchlist = async () => {
  //     try {
  //       const movies = await prisma.movie.findMany();
  //       setWatchlist(movies);
  //     } catch (error) {
  //       console.error('Error fetching watchlist:', error);
  //       // Handle error appropriately (e.g., display error message to user)
  //     }
  //   };

  //   fetchWatchlist();
  // }, []);

  return (
    <Card>
      <CardHeader css={{ justifyItems: 'center' }}>
        <h2>Your Watchlist</h2>
      </CardHeader>
      <CardBody>
        {watchlist.length === 0 ? (
          <p>Your watchlist is empty.</p>
        ) : (
          watchlist.map((movie) => (
            <MovieCard
              key={movie.tmdbId}
              movie={movie}
              // onRemove={() => removeFromWatchlist(movie.tmdbId)}
            />
          ))
        )}
      </CardBody>
    </Card>
  );
};

const MovieCard: React.FC<{
  movie: Movie;
  onRemove?: () => void;
}> = ({ movie, onRemove }) => {
  const { title, poster } = movie;

  return (
    <div className='movie-card'>
      <Image src={imageUrl} alt={title} />
      <div className='movie-info'>
        <p>{title}</p>
        {/* {onRemove && <Button onClick={onRemove}>Remove</Button>} */}
      </div>
    </div>
  );
};

export default Watchlist;
