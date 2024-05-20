import React from 'react';
import Link from 'next/link';
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

function Socials({css, data}) {
    console.log(data);
    const social_links = [
        {
          jsx: <Linkedin />,
          link: data?.linkedin,
        },
        { jsx: <Github />, link: data?.github },
        { jsx: <Twitter />, link: data?.twitter },
        { jsx: <Instagram />, link: data?.instagram },
        { jsx: <Facebook />, link: data?.facebook },
        { path: "img.jpg", link: data?.researchGate },
        { path: "img.jpg", link: data?.googleScholar },
      ];

  return (
    <ul className={css}>
              {social_links.map((item, index)=>{
                return <li key={index} className=' hover:bg-gray-700 dark:hover:'>
                  <Link target="_blank" href={item?.link}>
                    {item?.jsx ? item?.jsx : "null"}
                  </Link>
                </li>
              })}
            </ul>
  )
}

export default Socials;