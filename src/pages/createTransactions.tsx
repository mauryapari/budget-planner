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
import AccountSelector from "@/components/accountSelector";
import { account } from "@/types/accountsType";
import { DatePicker } from "@/components/datePicker";

const transactionSchema = z.object({
  transaction: z.string().min(2, {
    message: "Transaction must be at least 4 characters.",
  }),
  account: z.string(),
  amount: z.coerce.number().nonnegative(),
  transactionType: z.enum(["credit", "debit"]),
  transactionDate: z.coerce.date(),
});

const CreateTransactions = () => {
  const [userAccounts, setUserAccounts] = useState<account[]>([]);

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transaction: "",
      amount: 0,
      transactionType: "debit",
      transactionDate: new Date()
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof transactionSchema>) => {
    await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        accountID: values.account
      }),
    }).then((resp) => {
      return resp.json();
    }).then((resp) => {
      console.log(resp.message)
    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    async function fetchAccounts() {
      const response = await fetch("/api/account");
      const { data } = await response.json();
      setUserAccounts(data);
    }

    fetchAccounts();
  }, []);


  return (
    <div className="container my-6">
      <p className="text-3xl mb-10">Create a transaction</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="md:flex">
            <FormField
              control={form.control}
              name="account"
              render={({field}) => (
                <FormItem className="max-md:mb-5 md:w-[50%]">
                  <FormLabel>ChooseAccount</FormLabel>
                  <FormControl>
                    <AccountSelector accounts={userAccounts} changeAccount={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="md:w-[50%]">
                  <FormLabel>Select Transaction Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue="debit">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Transaction Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Credit</SelectItem>
                        <SelectItem value="debit">Debit</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="transaction"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Transaction Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Transaction Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="transactionDate"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Transaction Date</FormLabel>
                  <FormControl>
                    <DatePicker getDate={field.onChange}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Amount" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTransactions;
