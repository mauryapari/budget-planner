// pages/api/data.js
import clientPromise from '../../lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from "cookie";
import jwt, { Secret } from 'jsonwebtoken';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise();
    const db = client.db(process.env.DB_NAME);
    const secret: Secret = process.env.JWT_SECRET_KEY!;

    if (req.method === 'GET') {
        try {
            const parsedCookie = cookie.parse(req.headers.cookie || '');

            if (!parsedCookie.token) {
                return res.status(401).json({ error: 'Token not found in the cookie' });
            }

            const decodedToken = jwt.verify(parsedCookie.token, secret) as { userId: string };

            // Now you can access the user ID from the JWT payload
            const user_id = decodedToken.userId;
            const collection = db.collection('accounts');
            const data = await collection.find({ user_id }).toArray();
            res.status(200).json({ data });

        } catch (error) {
            let errorMessage = "Server Error"
            if (error instanceof Error) {
                errorMessage = error.message
                res.status(500).json({ message: errorMessage });
            }
        }
    }
    if (req.method === 'POST') {
        try {
            let cookies = cookie.parse(req.headers.cookie || '');
            const { account_type, account_name, balance } = req.body;
            const user_id = cookies.userID
            console.log(cookies, account_name, account_type, balance);
            const account = {
                user_id,
                account_type,
                account_name,
                balance,
            };
            const result = await db.collection('accounts').insertOne(account);

            res.status(201).json(result);
        } catch (error) {
            let errorMessage = "Server Error"
            if (error instanceof Error) {
                res.status(500).json({ message: errorMessage });
            }
        }
    }
}
