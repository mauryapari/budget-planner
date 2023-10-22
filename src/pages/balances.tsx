import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { account } from "@/types/accountsType";
import Link from "next/link";
import { useEffect, useState } from "react";

const Balances = () => {
    const [userAccounts, setUserAccounts] = useState<account[]>([]);
    useEffect(() => {
        async function fetchAccounts() {
            const response = await fetch("/api/account");
            const { data } = await response.json();
            setUserAccounts(data);
        }

        fetchAccounts();
    }, []);
    return <div className="container flex flex-wrap">
        {userAccounts?.map((item, index) => (
            <Card key={index} className="w-[25%]">
                <CardContent>
                    <p>{item.account_name}</p>
                    <p>{item.balance}</p>
                </CardContent>
            </Card>
        ))}
        <Card className="w-[25%]">
            <Link className="px-6 py-4 bg-green text-white" href="/accounts">Add Account</Link>
        </Card>
    </div>;
};

export default Balances;
