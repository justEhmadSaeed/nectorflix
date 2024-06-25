import { Input } from '@nextui-org/input';
import { SearchIcon } from './icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}
export default function SearchInput({
  value,
  onChange,
}: SearchInputProps) {
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
