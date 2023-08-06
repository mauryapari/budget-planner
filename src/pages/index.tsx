import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`container relative top-[50%] min-h-screen flex-col text-center justify-between p-24 ${inter.className}`}
    >
      <p className="text-md md:text-2xl my-4">Welcome to the </p>
      <h1 className="text-2xl md:text-3xl font-bold my-2">
        Financial Management Dashboard
      </h1>
      <div className="w-[200px] h-[2px] bg-gray-700 absolute left-[50%] translate-x-[-50%] my-6"></div>
      <Link href="auth/login">LogIn Here</Link>
    </main>
  );
}
