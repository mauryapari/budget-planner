// pages/api/data.js
import clientPromise from '../../../lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt, {Secret} from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log(req.body);
        const { email, password } = req.body;

        try {
            const client = await clientPromise();
            const db = client.db(process.env.DB_NAME);
            const user = await db.collection('users').findOne({ email });
            const userID = user?._id.toString()

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate JWT token
            const secret: Secret = process.env.JWT_SECRET_KEY!;
            const token = jwt.sign({ userId: user._id }, secret, {
                expiresIn: '1h', // Token expiration time
            });

            // Set the token as an HTTP-only cookie to secure it from JavaScript access
            res.setHeader(
                'Set-Cookie',
                [cookie.serialize('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development', // Set to true in production
                    sameSite: 'strict',
                    maxAge: 3600, // 1 hour (in seconds)
                    path: '/',
                }),cookie.serialize('userID', userID!, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development', // Set to true in production
                    sameSite: 'strict',
                    maxAge: 3600, // 1 hour (in seconds)
                    path: '/',
                }),]
            );

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to login' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
