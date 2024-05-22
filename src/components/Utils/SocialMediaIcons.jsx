import React from 'react';
import Link from 'next/link';
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from 'next/image';

function Socials({css, data}) {

    const social_links = [
        { jsx: <Linkedin />, link: data?.linkedin, name: "LinkedIn" },
        { jsx: <Github />, link: data?.github, name: "GitHub" },
        { jsx: <Twitter />, link: data?.twitter, name: "X-(Twitter)" },
        { jsx: <Instagram />, link: data?.instagram, name: "Instagram" },
        { jsx: <Facebook />, link: data?.facebook, name: "Facebook" },
        { path: "researchgate.png", link: data?.researchGate, name: "Research Gate" },
        { path: "googlescholar.png", link: data?.googleScholar, name: "Google Scholar" },
      ];

  return (
    <ul className={css}>
    {social_links.map((item, index) => {
      return (
        <li
          key={index}
          className="hover:bg-gray-400 dark:hover:bg-gray-600 duration-150 p-2 cursor-pointer flex items-center gap-2 group relative"
        >
          <Link target="_blank" href={item?.link}>
            {item?.jsx ? (
              item?.jsx
            ) : (
              <Image
                src={`/${item?.path}`}
                width={26}
                height={26}
                className="p-[1px]"
                alt={item?.path}
              />
            )}
          </Link>
          <span
            className="font-semibold absolute right-full opacity-0 group-hover:opacity-100 group-hover:right-[calc(100%+0.7rem)] transition-all duration-300"
          >
            {item?.name}
          </span>
        </li>
      );
    })}
  </ul>
  )
}

export default Socials;