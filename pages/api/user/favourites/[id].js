import { authenticateRequest } from '@/lib/server/auth';
import {
  addToFavourites,
  connect,
  removeFromFavourites,
} from '@/lib/user-service';

export default async function handler(req, res) {
  if (!['PUT', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = await authenticateRequest(req, res);
    await connect();

    const favourites =
      req.method === 'PUT'
        ? await addToFavourites(user._id, req.query.id)
        : await removeFromFavourites(user._id, req.query.id);

    return res.status(200).json(favourites);
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : 'Unable to update favourites' });
  }
}
