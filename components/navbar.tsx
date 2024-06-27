'use client';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { link as linkStyles } from '@nextui-org/theme';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/themeSwitch';
import { Logo } from '@/components/icons';
import { useWatchlistStore } from '@/store/watchlist';
import { useEffect } from 'react';
import { createNewWatchlist } from '@/services/db';

export const Navbar = (): JSX.Element => {
  const { watchlistId, setWatchlistId } = useWatchlistStore(
    (state) => ({
      watchlistId: state.watchlistId,
      setWatchlistId: state.setWatchlistId,
    })
  );

  useEffect(() => {
    async function fetchWatchlistId(): Promise<void> {
      let watchId = parseInt(
        localStorage.getItem('watchlistId') ?? '-1'
      );
      if (watchId !== -1) {
        setWatchlistId(watchId);
      } else {
        watchId = (await createNewWatchlist()) ?? -1;
        if (watchId !== -1) {
          setWatchlistId(watchId);
          localStorage.setItem('watchlistId', watchId.toString());
        }
      }
    }
    void fetchWatchlistId();
  }, [setWatchlistId]);

  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent
        className='basis-1/5 sm:basis-full'
        justify='start'
      >
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink
            className='flex justify-start items-center gap-1'
            href='/'
          >
            <Logo />
            <p className='font-bold text-inherit'>NectorFlix</p>
          </NextLink>
        </NavbarBrand>
        <ul className='hidden lg:flex gap-4 justify-start ml-2'>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href()}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color='foreground'
                href={item.href(watchlistId?.toString())}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden sm:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden sm:flex gap-2'>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navItems.map((item) => (
            <NavbarMenuItem key={item.label}>
              <Link
                color={'foreground'}
                href={item.href(watchlistId?.toString())}
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
