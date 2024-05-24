import Error from "@/components/Utils/Error";
import SeeMoreBtn from "@/components/Utils/SeeMoreBtn";
import Link from "next/link";
import React from "react";

export default function Publications({ data, limit }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;

  return (
    <div className="p-4 lg:p-12 grid gap-2">
      <h1 className=" text-5xl lg:text-6xl text-mountain-meadow-500 font-serif relative">
        <div className="absolute bottom-0 left-0 h-[51%] z-50 w-[450px] bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40"></div>
        PUBLICATIONS
      </h1>
      <ul className="grid">
        {data.map((item, index) => {
          if (index > limit) {
            return;
          }
          if (index === limit) {
            return (
              <li key={index} className=" w-full mt-4">
                <SeeMoreBtn link={"/publications"} />
              </li>
            );
          }
          return (
            <li
              key={index}
              className=" grid gap-1 border-mountain-meadow-500  rounded-b-3xl p-4 lg:px-8 lg:py-6 border-b-[1.5px] md:border-b-2"
            >
              <div className=" flex items-center justify-between flex-wrap">
                <Link
                  target="_blank"
                  href={item?.link}
                  className=" text-xl md:text-2xl font-semibold hover:text-mountain-meadow-500 duration-150"
                >
                  {item?.title}
                </Link>
                <h1 className=" font-semibold">Published Year: {item?.year}</h1>
              </div>
              <div className="">
                <h1 className=" text-lg md:text-xl font-semibold text-mountain-meadow-500">
                  {item?.members.length === 1 ? "Member:" : "Members:"}
                </h1>
                <ul className=" px-6 dark:text-gray-300 text-gray-700">
                  {item?.members.map((ele, index) => {
                    return (
                      <li key={index} className="">
                        {ele}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
