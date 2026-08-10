import { connect, registerUser } from '@/lib/user-service';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connect();
    const message = await registerUser(req.body);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
