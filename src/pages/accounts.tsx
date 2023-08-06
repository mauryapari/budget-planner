// pages/index.tsx
import AccountCreator from '@/components/accountCreator';
import React, { useEffect, useState } from 'react';

interface DataItem {
  _id: string;
  name: string;
  // Add other properties here as per your data schema
}

const Accounts: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  return (
    <main 
    className={`container relative top-[50%] min-h-screen flex-col justify-between p-24`}
    >
      <AccountCreator/>
    </main>
  );
};

export default Accounts;
