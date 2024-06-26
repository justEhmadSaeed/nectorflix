import { Input } from '@nextui-org/input';
import { SearchIcon } from './icons';
import { useMoviesStore } from '@/store/movie';

export default function SearchInput(): JSX.Element {
  const { query, handleQueryChange } = useMoviesStore((state) => ({
    query: state.query,
    handleQueryChange: state.handleQueryChange,
  }));
  return (
    <Input
      aria-label='Search'
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-md',
      }}
      labelPlacement='outside'
      placeholder='Search Movies'
      autoFocus
      startContent={
        <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
      }
      type='search'
      value={query}
      onChange={(e) => {
        void (async () => {
          await handleQueryChange(e.target.value);
        })();
      }}
    />
  );
}
