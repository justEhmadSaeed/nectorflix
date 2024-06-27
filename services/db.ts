'use server';

import type { Movie } from '@/interfaces';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNewWatchlist = async (): Promise<
  number | undefined
> => {
  try {
    const watchlist = await prisma.watchlist.create({});
    return watchlist.id;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating new watchlist:', error);
  }
};

export const addMovieToWatchlist = async (
  watchlistId: number,
  tmdbId: number,
  title: string,
  year: number,
  poster: string
): Promise<boolean> => {
  try {
    await prisma.movie.create({
      data: {
        watchlistId,
        tmdbId,
        title,
        year,
        poster,
      },
    });
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error adding movie to watchlist:', error);
    return false;
  }
};

export const removeMovieFromWatchlist = async (
  watchlistId: number,
  tmdbId: number
): Promise<boolean> => {
  try {
    await prisma.movie.delete({
      where: { watchlistId, tmdbId },
    });
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error removing movie from watchlist:', error);
    return false;
  }
};

// check where a movie exists in a watchlist
export const movieExistsInWatchlist = async (
  watchlistId: number,
  tmdbId: number
): Promise<boolean> => {
  const movie = await prisma.movie.findUnique({
    where: { watchlistId, tmdbId },
  });

  return movie != null;
};

export const getMoviesByWatchlistId = async (
  watchlistId: number
): Promise<Movie[]> => {
  return await prisma.movie.findMany({
    where: { watchlistId },
  });
};
