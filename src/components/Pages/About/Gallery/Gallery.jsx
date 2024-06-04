import Image from "next/image";
import Link from "next/link";
import React from "react";
import ScatteredImages from "./ScatteredImages";
import { cinzel, italiana } from "@/app/fonts";

export default function Gallery() {
  const images = [
    {
      img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
      title: "Bed",
      author: "swabdesign",
    },
    // {
    //   img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    //   title: 'Books',
    //   author: 'Pavel Nekoranec',
    // },
    // {
    //   img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    //   title: 'Sink',
    //   author: 'Charles Deluvio',
    // },
    {
      img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
      title: "Kitchen",
      author: "Christian Mackie",
    },
    {
      img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
      title: "Blinds",
      author: "Darren Richardson",
    },
    {
      img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
      title: "Chairs",
      author: "Taylor Simpson",
    },
    {
      img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
      title: "Laptop",
      author: "Ben Kolde",
    },
    {
      img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
      title: "Doors",
      author: "Philipp Berndt",
    },
    {
      img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
      title: "Coffee",
      author: "Jen P.",
    },
    {
      img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
      title: "Storage",
      author: "Douglas Sheppard",
    },
    // {
    //   img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    //   title: 'Candle',
    //   author: 'Fi Bell',
    // },
    // {
    //   img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    //   title: 'Coffee table',
    //   author: 'Hutomo Abrianto',
    // },
  ];
  function getRandomNumber() {
    return Math.floor(Math.random() * 6);
  }
  

  return (
    <div className=" grid g">
      <div className=" w-full p-4 grid md:flex">
      <div className=" w-full md:w-4/12 lg:w-1/3 flex flex-col items-center justify-center">
        <h1 className=" flex items-center flex-wrap gap-2 w-fit relative font-bold text-5xl lg:text-6xl text-mountain-meadow-500 ">
          Gallery
          <div className="dark:border-white border-black border-b-[3px] absolute -bottom-0 right-0 left-0 -z-10"></div>
        </h1>
        <p>Travel Memories from Around the World</p>
      </div>
      <div className="w-full md:w-8/12 lg:w-2/3 flex items-center justify-center pr-28">
        <ScatteredImages images={images} />
      </div>
    </div>
     <div className=" w-full p-4 grid md:flex">
     <div className="w-full md:w-8/12 lg:w-2/3 flex items-center justify-center pr-28">
       <ScatteredImages images={images} />
     </div>
     <div className=" w-full md:w-4/12 lg:w-1/3 flex flex-col items-center justify-center">
       <h1 className={`${cinzel.className} flex items-center flex-wrap gap-2 relative font-bold text-6xl w-96 lg:text-6xl text-mountain-meadow-500`}>
       Travel Tales Told in Pictures
         <div className="dark:border-white border-black border-b-[3px] absolute -bottom-0 right-0 left-0 -z-10"></div>
       </h1>
     </div>
   </div>
    </div>
  );
}
