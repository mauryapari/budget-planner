// pages/api/data.js
import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongo';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
  } else if (req.method === 'POST') {
    const transactionData = req.body;

    try {
      const client = await clientPromise();
      const db = client.db(process.env.DB_NAME);
      const transactionsCollection = db.collection("transactions");
      const accountCollection = db.collection("accounts");

      await transactionsCollection.insertOne(transactionData);

      const { account, amount, transactionType } = transactionData;
      const accountID =  new ObjectId(account);
      console.log(accountID, amount, transactionType);

      if (accountID && amount) {
        const account = await accountCollection.findOne({ _id: accountID });
        console.log(account);

        if (account) {
          let newBalance;

          if (transactionType === 'debit') {
            newBalance = account.balance - amount;
          } else if (transactionType === 'credit') {
            newBalance = account.balance + amount;
          }

          const updatedResult = await accountCollection.updateOne(
            { _id: accountID },
            { $set: { balance: newBalance } }
          )
          console.log('updated result is',updatedResult);

        }
      }
      res.status(201).json({ message: "Transaction Created and account balance updated" })
    } catch (error) {
      let errorMessage = "Server ERROR";
      if (error instanceof Error) {
        res.status(500).json({ message: errorMessage })
      }
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }

}
