import { Inter } from "next/font/google";
import Link from "next/link";
import * as z from "zod";

import {
  Form,
  FormMessage,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const inter = Inter({ subsets: ["latin"] });

const loginSchema = z.object({
  mail: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (response.ok) {
        // Login successful, redirect to dashboard or protected page
        window.location.href = "/transactions";
      } else {
        // Handle login error
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={`container min-h-screen flex-col p-24 ${inter.className}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mail</FormLabel>
                <FormControl>
                  <Input placeholder="Mail" {...field} />
                </FormControl>
                <FormDescription>Enter you Mail ID</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password"/>
                </FormControl>
                <FormDescription>Enter the password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p className="text-xl">
        {" "}
        <Link href="register">Create an account</Link>
      </p>
    </main>
  );
}
