import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/components/dataTable";
import { columns } from "@/components/columns";
import { account, formattedTransaction, transaction } from "@/types/accountsType";
import AccountSelector from "@/components/accountSelector";

const formatDate = (dateString: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const formatData = (data: transaction[]) => {
  const formattedData = data.map(item => {
    return {
      ...item,
      transactionDate: formatDate(item.transactionDate),
      transactionType: item.transactionType.toUpperCase()
    }
  })
  return formattedData;
}

const Transactions = () => {
  const [userTransactions, setUserTransactions] = useState<formattedTransaction[]>([]);
  const [userAccounts, setUserAccounts] = useState<account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedTransactions, setSelectedTransactions] = useState<
  formattedTransaction[]
  >([]);

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch("/api/transactions");
      const { data } = await response.json();
      const formattedData = formatData(data);

      setUserTransactions(formattedData);
      console.log(data);
    }

    async function fetchAccounts() {
      const response = await fetch("/api/account");
      const { data } = await response.json();
      setUserAccounts(data);
    }

    fetchAccounts();
    fetchTransactions();
  }, []);

  useEffect(() => {
    const data = userTransactions.filter(
      (item) => item.accountID === selectedAccount
    );
    setSelectedTransactions(data);
  }, [userTransactions, selectedAccount]);


  return (
    <div className="container my-6">
      <p className="text-3xl mb-6">Transactions</p>
      <div className="my-10">
        <p className="text-sm font-medium mb-2">Select Account</p>
        <AccountSelector
          accounts={userAccounts}
          changeAccount={setSelectedAccount}
        />
      </div>
      <DataTable columns={columns} data={selectedTransactions} />

      <Link
        href="/createTransactions"
        className={`${buttonVariants({ variant: "default" })} my-8` }
      >
        Create Transaction
      </Link>
    </div>
  );
};

export default Transactions;
