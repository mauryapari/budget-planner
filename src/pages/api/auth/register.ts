import clientPromise from '../../../lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        const { username, mail, password } = req.body;
        const client = await clientPromise();
        const db = client.db(process.env.DB_NAME);
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            username,
            mail,
            password: hashedPassword,
        };

        try {
            await db.collection('users').insertOne(user);
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
