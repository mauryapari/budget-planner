// pages/api/data.js
import clientPromise from '../../lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('transactions');

    const data = await collection.find({}).toArray();

    res.status(200).json({ data });
  } catch (error) {
    let errorMessage = "Server Error"
    if (error instanceof Error) {
      res.status(500).json({ message: errorMessage });
    }
  }
}
