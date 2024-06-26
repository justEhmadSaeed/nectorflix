'use client';

import { useEffect } from 'react';
import { Button } from '@/utils/nextui';
import Link from 'next/link';

export default function Error({
  error,
}: {
  error: Error;
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className='mt-10 w-full flex flex-col justify-center gap-6'>
      <h2 className='text-center text-3xl'>{error.message}</h2>
      <div className='text-center'>
        <Button variant='bordered' size='lg' as={Link} href='/'>
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
