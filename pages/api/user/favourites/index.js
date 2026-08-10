import { authenticateRequest } from '@/lib/server/auth';
import { connect, getFavourites } from '@/lib/user-service';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = await authenticateRequest(req, res);
    await connect();
    return res.status(200).json(await getFavourites(user._id));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : 'Unable to load favourites' });
  }
}
