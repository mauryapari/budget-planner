// pages/index.tsx
import React, { useEffect, useState } from 'react';

interface DataItem {
  _id: string;
  name: string;
  // Add other properties here as per your data schema
}

const Home: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/transaction');
      const { data } = await response.json();
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Your MongoDB Data:</h1>
      <ul>
        {data?.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
