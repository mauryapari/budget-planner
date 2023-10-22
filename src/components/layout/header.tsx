import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from 'react-icons/fa';

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
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  return (
    <div className="max-w-none xl:rounded-r transform xl:translate-x-0 ease-in-out transition duration-500 h-full w-full bg-gray-900 relative">
      <NavigationMenu className="hidden md:block mx-auto">
        <NavigationMenuList className="flex justify-start items-start">
          {headerItems.map((item, index) => (
            <NavigationMenuItem key={index} className="p-4">
              <Link legacyBehavior passHref href={item.link}>
                <NavigationMenuLink className="text-white">{item.name}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem className="p-4">
            <Link legacyBehavior passHref href="/auth/login">
              <NavigationMenuLink className="text-white">Login</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button onClick={toggleMenu} className="md:hidden text-white">
        <FaBars />
      </Button>
      {menuVisible &&
        <div
          className={
            menuVisible
              ? 'absolute top-0 left-0 h-screen w-3/5 shadow-md bg-gray-900 z-10'
              : 'hidden'
          }>
          <div className='flex flex-col'>
            <button
              className='mb-7 mt-7 mr-1 flex justify-end px-5 text-xl text-white'
              onClick={toggleMenu}
            >
              <AiOutlineClose class />
            </button>
            <NavigationMenu className="">
              <NavigationMenuList className="block">
                <NavigationMenuItem className="p-4">
                  <Link legacyBehavior passHref href="/auth/login">
                    <NavigationMenuLink className="text-white">Login</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                {headerItems.map((item, index) => (
                  <NavigationMenuItem key={index} className="p-4">
                    <Link legacyBehavior passHref href={item.link}>
                      <NavigationMenuLink  onClick={toggleMenu} className="text-white">{item.name}</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>}
    </div>
  );
};

export default Header;
