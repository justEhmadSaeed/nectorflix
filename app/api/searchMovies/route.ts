import { searchMovies } from '@/services/tmdb';
import { type AxiosError } from 'axios';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest
): Promise<NextResponse> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const query = request.nextUrl.searchParams.get('query')!;
    const movies = await searchMovies(query);
    return NextResponse.json(movies);
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json({ error: axiosError.message });
  }
}
