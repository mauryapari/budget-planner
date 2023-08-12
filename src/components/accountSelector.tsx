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
  accounts: account[]
}

const AccountSelector = (props: AccountProps) => {
  const { accounts } = props;
  console.log(accounts);
  return (
    <Select>
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
