import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
const headerItems = [
  { name: "Overview", link: "/" },
  { name: "Balances", link: "/balances" },
  { name: "Transactions", link: "/transactions" },
  { name: "Bills", link: "/" },
  { name: "Expenses", link: "/" },
  { name: "Goals", link: "/" },
  { name: "Settings", link: "/" },
];
const Header = () => {
  return (
    <div className="">
      <NavigationMenu className="max-w-none xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500  h-full  w-full bg-gray-900">
        <NavigationMenuList className="flex justify-start items-start">
          {headerItems.map((item, index) => (
            <NavigationMenuItem key={index} className="p-4">
              <Link legacyBehavior passHref href={item.link}>
                <NavigationMenuLink className="text-white">{item.name}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Header;
