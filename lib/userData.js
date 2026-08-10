import { getToken } from '@/lib/authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/user';

async function requestFavourites(path = '', method = 'GET') {
  const token = getToken();

  if (!token) return [];

  try {
    const response = await fetch(`${API_URL}/favourites${path}`, {
      method,
      headers: { Authorization: `JWT ${token}` },
    });

    return response.ok ? await response.json() : [];
  } catch {
    return [];
  }
}

export function addToFavourites(id) {
  return requestFavourites(`/${encodeURIComponent(id)}`, 'PUT');
}

export function removeFromFavourites(id) {
  return requestFavourites(`/${encodeURIComponent(id)}`, 'DELETE');
}

export function getFavourites() {
  return requestFavourites();
}
