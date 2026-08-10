import jwt from 'jsonwebtoken';
import { checkUser, connect } from '@/lib/user-service';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing');
    }

    await connect();
    const user = await checkUser(req.body);
    const payload = {
      _id: user._id.toString(),
      userName: user.userName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
