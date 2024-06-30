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
    <div className="p-4 lg:p-12 overflow-hidden">
     <h1 className=" md:text-5xl text-4xl text-mountain-meadow-500 font-serif">Gallery</h1>

      <div className=" w-full p-4 grid md:flex">
        <div className=" w-full md:w-4/12 lg:w-1/3 flex flex-col items-center justify-center">
          <h1
            className={`${cinzel.className} flex items-center flex-wrap gap-2 relative font-bold text-4xl md:text-5xl w-96 lg:text-6xl text-mountain-meadow-500`}
          >
            Learning and Traveling the World
            <div className="dark:border-white border-black border-b-[1px] md:border-b-[3px] absolute -bottom-0 right-0 left-0 -z-10"></div>
          </h1>
        </div>
        <div className="w-full md:w-8/12 lg:w-2/3 grid md:flex items-center justify-center md:pr-28">
          <ScatteredImages images={getRandomImages(data)} side={"left"} />
        </div>
      </div>
      <div className=" w-full p-4 flex md:flex-row flex-col-reverse mt-4">
        <div className="w-full md:w-8/12 lg:w-2/3 flex items-center justify-center md:pl-28">
          <ScatteredImages images={getRandomImages(data)} side={"right"} />
        </div>
        <div className=" w-full md:w-4/12 lg:w-1/3 flex items-center justify-center md:grid">
          <h1
            className={`${cinzel.className} flex items-center flex-wrap gap-2 relative font-bold text-4xl md:text-5xl w-96 lg:text-6xl text-mountain-meadow-500`}
          >
            Travel Tales Told in Pictures
            <div className="dark:border-white border-black border-b-[1px] md:border-b-[3px] absolute -bottom-0 right-0 left-0 -z-10"></div>
          </h1>
        </div>
      </div>
    </div>
  );
}
