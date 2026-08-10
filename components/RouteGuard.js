import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';
import { favouritesAtom } from '@/store';

const PUBLIC_PATHS = ['/login', '/register', '/about'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    async function updateAtom() {
      const favourites = await getFavourites();
      if (active) setFavouritesList(favourites);
    }

    function authCheck(url) {
      const path = url.split('?')[0];

      if (isAuthenticated()) {
        setAuthorized(true);
      } else if (PUBLIC_PATHS.includes(path)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
        setFavouritesList(undefined);
        router.push('/login');
      }
    }

    if (isAuthenticated()) updateAtom();
    authCheck(router.asPath);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      active = false;
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [router, setFavouritesList]);

  return authorized ? children : null;
}
