// pages/api/data.js
import clientPromise from '../../lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from "cookie";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise();
    const db = client.db(process.env.DB_NAME);
    if (req.method === 'GET') {
        try {
            const { user_id } = req.query;
            const collection = db.collection('accounts');
            const data = await collection.find({ user_id }).toArray();

            res.status(200).json({ data });

        } catch (error) {
            let errorMessage = "Server Error"
            if (error instanceof Error) {
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
