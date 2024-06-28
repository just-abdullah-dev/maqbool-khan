"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "@/components/Utils/ThemeSwitcher";
import NavLink from "./NavLink";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    let sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("right-0");
  };
  const nav_links = [
    { name: "Home", link: "" },
    { name: "About", link: "about" },
    { name: "Publications", link: "publications" },
    { name: "Projects", link: "projects" },
    { name: "Contact", link: "contact" },
  ];

  return (
    <header className="p-4 md:px-16 flex justify-end md:justify-center items-center bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 z-50 sticky top-0 left-0">

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-12">
        {nav_links.map((item, index) => {
          return (
            <NavLink item={item} key={index} handleClick={
              ()=>setIsMenuOpen(false)
            } />
          );
        })}
      </nav>
        <div className=" mx-4">
        <ThemeSwitcher />
        </div>
      {/* Mobile Menu */}
      <div className="md:hidden mt-2">
        <button name="" onClick={toggleMenu} className="">
          {isMenuOpen ? <X/> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      <div
        id="sidebar"
        className=" absolute top-full z-50 -right-36  bg-gray-200 dark:bg-gray-900 duration-500 w-fit h-screen"
      >
        {isMenuOpen && (
          <nav className="flex flex-col space-y-2 p-6 pr-12">
            {nav_links.map((item, index) => {
              return (
                <Link
                  onClick={()=>setIsMenuOpen(false)}
                  key={index}
                  href={`/${item.link}`}
                  className=" hover:"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

    </header>
  );
};

export default Header;

