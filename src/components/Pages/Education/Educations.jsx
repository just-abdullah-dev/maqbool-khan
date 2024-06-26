import Error from "@/components/Utils/Error";
import SeeMoreBtn from "@/components/Utils/SeeMoreBtn";
import React from "react";
import Education from "./Education";

export default function Educations({ data, limit }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;

  return (
    <div className="p-4 grid gap-2 dark:bg-gray-800 bg-gray-300 rounded-lg bg-opacity-80 h-fit ">
     <h1 className=" md:text-5xl text-4xl text-mountain-meadow-500 font-serif ">Education</h1>
      <ul className="grid gap-6 py-2 border-l-4 border-mountain-meadow-500">
        {data.map((item, index) => {
          if (index + 1 > limit) {
            return;
          }
          return <Education key={index} item={item} />
          
        })}
      </ul>
      {data.length > limit &&
      <div className=" w-full mt-4">
        <SeeMoreBtn link={"/about#education"} />
      </div>
      }
    </div>
  );
}
