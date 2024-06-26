'use client';

import { HeartIcon } from '@/components/icons';
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Button,
} from '@/utils/nextui';
import { useState } from 'react';

interface MovieDetailsWrapperProps {
  name: string;
  poster: string;
  children: React.ReactNode;
}

export default function MovieDetailsWrapper({
  name,
  poster,
  children,
}: MovieDetailsWrapperProps): JSX.Element {
  const [liked, setLiked] = useState(false);
  return (
    <Card>
      <CardHeader style={{ justifyContent: 'space-between' }}>
        <h1>{name}</h1>
        <Button
          size='sm'
          color='secondary'
          variant='bordered'
          onPress={() => {
            setLiked((like) => !like);
          }}
        >
          <span>Add to Watchlist</span>
          <HeartIcon
            className={liked ? '[&>path]:stroke-transparent' : ''}
            fill={liked ? 'currentColor' : 'none'}
          />
        </Button>
      </CardHeader>
      <CardBody className='gap-6'>
        <div className='w-full'>
          <Image src={poster} alt={name} />
        </div>
        {children}
      </CardBody>
    </Card>
  );
}
