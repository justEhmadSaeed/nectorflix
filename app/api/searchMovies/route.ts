import { searchMovies } from '@/services/tmdb';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface IParams {
  query: string;
}
export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('query') as string;
    const movies = await searchMovies(query);
    return NextResponse.json(movies);
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json({ error: axiosError.message });
  }
}
