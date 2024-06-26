import { Providers } from '@/app/providers';

export default function MovieDetailLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Providers
      themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
    >
      <section className='flex flex-col items-center justify-center gap-4'>
        <div className='inline-block max-w-lg text-center justify-center'>
          {children}
        </div>
      </section>
    </Providers>
  );
}
