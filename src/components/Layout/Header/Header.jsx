"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "@/components/Utils/ThemeSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    let sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("right-0");
  };
  const nav_links = [
    { name: "Publications", link: "publications" },
    { name: "Research", link: "research" },
    { name: "About", link: "about" },
    { name: "Contact", link: "contact" },
  ];

  return (
    <header className="p-4 md:px-16 flex justify-end md:justify-center items-center relative">

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-12">
        {nav_links.map((item, index) => {
          return (
            <Link onClick={()=>setIsMenuOpen(false)} key={index} href={`/${item.link}`} className="">
              {item.name}
            </Link>
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
        className=" absolute top-full z-50 -right-36  bg-gray-200 dark:bg-gray-800 duration-500 w-fit h-screen"
      >
        {isMenuOpen && (
          <nav className="flex flex-col space-y-2 p-6 pr-12">
            {nav_links.map((item, index) => {
              return (
                <Link
                  onClick={()=>setIsMenuOpen(false)}
                  key={index}
                  href={`/${item.link}`}
                  className=" "
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
