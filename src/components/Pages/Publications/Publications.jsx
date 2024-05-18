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
    <div className="p-4 lg:p-12 grid gap-4">
      <h1 className=" text-5xl lg:text-6xl text-mountain-meadow-500 font-serif relative">
        <div className="absolute bottom-0 left-0 h-[51%] z-50 w-[450px] bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40"></div>
        PUBLICATIONS
      </h1>
      <ul className="grid gap-8">
        {data.map((item, index) => {
          if (index > limit) {
            return;
          }
          if (index === limit) {
            return (
              <li key={index} className=" w-full ">
                <SeeMoreBtn link={"/publications"} />
              </li>
            );
          }
          return (
            <li
              key={index}
              className="grid gap-3 hover:bg-mountain-meadow-200 dark:hover:bg-mountain-meadow-900 dark: hover:bg-opacity-50 border border-mountain-meadow-500 rounded-3xl p-4 lg:px-8 lg:py-6 transition-all duration-300"
            >
              <div className=" flex items-center justify-between flex-wrap">
                <Link
                  target="_blank"
                  href={item?.link}
                  className=" text-2xl font-semibold hover:text-mountain-meadow-500 duration-150"
                >
                  {item?.title}
                </Link>
                <h1 className=" font-semibold">Published Year: {item?.year}</h1>
              </div>
              <div className="">
                <h1 className=" text-2xl font-semibold text-mountain-meadow-500">
                  {item?.members.length === 1 ? "Member:" : "Members:"}
                </h1>
                <ul className=" px-6">
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
