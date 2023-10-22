import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { account } from "@/types/accountsType";

type AccountProps = {
  accounts: account[],
  changeAccount: (...event: any[]) => void
}

const AccountSelector = (props: AccountProps) => {
  const { accounts, changeAccount } = props;
  
  return (
    <Select onValueChange={changeAccount} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        {accounts?.map((item:account) => (
          <SelectItem key={item._id} value={item._id}>{item.account_name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountSelector;
