/* eslint-disable no-console */
'use server';

import type { Movie } from '@/interfaces';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNewWatchlist = async (): Promise<
  number | undefined
> => {
  try {
    const watchlist = await prisma.watchlist.create({});
    return watchlist?.id;
  } catch (error) {
    console.error('Error creating new watchlist:', error);
  }
};

const getOrCreateMovie = async (movieData: Movie): Promise<Movie> => {
  let movie = await prisma.movie.findUnique({
    where: { tmdbId: movieData.tmdbId },
  });
  // Movie doesn't exist, create and link it
  if (movie == null) {
    movie = await prisma.movie.create({
      data: movieData,
    });
  }

  return movie;
};

export const addMovieToWatchlist = async (
  watchlistId: number,
  tmdbId: number,
  title: string,
  year: number,
  poster: string
): Promise<boolean> => {
  try {
    const movieData = {
      tmdbId,
      title,
      year,
      poster,
    };
    const movie = await getOrCreateMovie(movieData);
    await prisma.watchlistMovie.create({
      data: { watchlistId, movieId: movie.tmdbId },
    });
    return true;
  } catch (error) {
    console.error('Error adding movie to watchlist:', error);
    return false;
  }
};

export const removeMovieFromWatchlist = async (
  watchlistId: number,
  tmdbId: number
): Promise<boolean> => {
  try {
    await prisma.watchlistMovie.deleteMany({
      where: { watchlistId, movieId: tmdbId },
    });
    return true;
  } catch (error) {
    console.error('Error removing movie from watchlist:', error);
    return false;
  }
};

// check where a movie exists in a watchlist
export const movieExistsInWatchlist = async (
  watchlistId: number,
  tmdbId: number
): Promise<boolean> => {
  try {
    const watchlistCount = await prisma.watchlistMovie.count({
      where: { watchlistId, movieId: tmdbId },
    });
    return watchlistCount > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getMoviesByWatchlistId = async (
  watchlistId: number
): Promise<Movie[]> => {
  try {
    const watchlist = await prisma.watchlist.findUnique({
      where: { id: watchlistId },
      include: {
        movies: {
          include: { movie: true },
        },
      },
    });
    return (
      watchlist?.movies.map(
        (movie: { movie: Movie }) => movie.movie
      ) ?? []
    );
  } catch (error) {
    console.error('Error getting movies by watchlist ID:', error);
    return [];
  }
};
