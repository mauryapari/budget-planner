import { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { account } from "@/types/accountsType";

const accountTypeOptions = [
  { label: "Savings", value: "savings" },
  { label: "Investment", value: "investment" },
];

const accountSchema = z.object({
  accountType: z.enum(["savings", "investment"]).refine((val) => !!val, {
    message: "Account type is required.",
  }),
  accountName: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .nonempty("Account name is required and cannot be empty."),
  balance: z.number({}).nonnegative(),
});
const AccountCreator = () => {
  const [userAccounts, setUserAccounts] = useState<account[]>([]);

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      accountType: "savings",
      accountName: "",
      balance: 0,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof accountSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const obj = {
        account_type: values.accountType,
        account_name: values.accountName,
        balance: values.balance
    }
    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...obj }),
      });
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <p>Create a transaction</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ChooseAccount</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypeOptions?.map((item) => (
                        <SelectItem key={item.label} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="accountName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Balance</FormLabel>
                <FormControl>
                  <Input placeholder="Balance" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountCreator;
