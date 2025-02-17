'use client';

import { useEffect } from 'react';
import { Button } from '@/utils/nextui';

export default function Error({
  error,
  reset,
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
      <h2 className='text-center text-3xl'>Something went wrong!</h2>
      <div className='text-center'>
        <Button
          variant='bordered'
          size='lg'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => {
              reset();
            }
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
