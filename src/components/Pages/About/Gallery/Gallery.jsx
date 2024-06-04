'use client';

import React from "react";
import ScatteredImages from "./ScatteredImages";
import { cinzel, italiana } from "@/app/fonts";
import Error from "@/components/Utils/Error";
import getRandomImages from "@/utils/getRandomGalleryImages";

export default function Gallery({data}) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;

  return (
    <div className="">
      <h1 className=' text-5xl lg:text-6xl text-mountain-meadow-500 font-serif relative px-4 lg:px-12'>
        <div className='absolute bottom-0 left-0 h-[48%] z-50 w-[330px] bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40'></div>
            GALLERY
      </h1>

      <div className=" w-full p-4 grid md:flex">
        <div className=" w-full md:w-4/12 lg:w-1/3 flex flex-col items-center justify-center">
          <h1
            className={`${cinzel.className} flex items-center flex-wrap gap-2 relative font-bold text-6xl w-96 lg:text-6xl text-mountain-meadow-500`}
          >
            Learning and Traveling the World
            <div className="dark:border-white border-black border-b-[3px] absolute -bottom-0 right-0 left-0 -z-10"></div>
          </h1>
        </div>
        <div className="w-full md:w-8/12 lg:w-2/3 flex items-center justify-center pr-28">
          <ScatteredImages images={getRandomImages(data)} side={"left"} />
        </div>
      </div>
      <div className=" w-full p-4 grid md:flex mt-4">
        <div className="w-full md:w-8/12 lg:w-2/3 flex items-center justify-center pl-28">
          <ScatteredImages images={getRandomImages(data)} side={"right"} />
        </div>
        <div className=" w-full md:w-4/12 lg:w-1/3 flex flex-col items-center justify-center">
          <h1
            className={`${cinzel.className} flex items-center flex-wrap gap-2 relative font-bold text-6xl w-96 lg:text-6xl text-mountain-meadow-500`}
          >
            Travel Tales Told in Pictures
            <div className="dark:border-white border-black border-b-[3px] absolute -bottom-0 right-0 left-0 -z-10"></div>
          </h1>
        </div>
      </div>
    </div>
  );
}
