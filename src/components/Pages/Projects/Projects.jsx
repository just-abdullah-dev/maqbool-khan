import Error from "@/components/Utils/Error";
import SeeMoreBtn from "@/components/Utils/SeeMoreBtn";
import getFormatDate from "@/utils/formateDate";
import Link from "next/link";
import React from "react";

export default function Projects({ data, limit }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;

  return (
    <div className="p-4 lg:p-12 grid gap-2">
      <h1 className=" text-5xl lg:text-6xl text-mountain-meadow-500 font-serif relative">
        <div className="absolute bottom-0 left-0 h-[51%] z-50 w-[330px] bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40"></div>
        PROJECTS
      </h1>
      <ul className="grid">
        {data.map((item, index) => {
          if (index > limit) {
            return;
          }
          if (index === limit) {
            return (
              <li key={index} className=" w-full mt-4">
                <SeeMoreBtn link={"/projects"} />
              </li>
            );
          }
          return (
            <li
              key={index}
              className="grid gap-1 border-mountain-meadow-500  rounded-b-3xl p-4 lg:px-8 lg:py-6 border-b-[1.5px] md:border-b-2"
            >
              <div className="">
                <div className=" flex items-center justify-between flex-wrap">
                  <Link
                    target="_blank"
                    href={item?.link}
                    className=" text-xl md:text-2xl font-semibold hover:text-mountain-meadow-500 duration-150"
                  >
                    {item?.title}
                  </Link>
                  <p className=" ">
                    {getFormatDate(item?.from)}---
                    {item?.isCompleted
                      ? getFormatDate(item?.to)
                      : "Currently Working"}
                  </p>
                </div>
                <div className=" font-semibold text-lg">{item?.institute}</div>
              </div>
              <div className="">
                <h1 className=" text-lg md:text-xl font-semibold text-mountain-meadow-500">
                  Responsibilities:
                </h1>
                <ul className=" px-6">
                  {item?.responsibilities.map((ele, index) => {
                    return (
                      <li key={index} className="">
                        {ele}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className=" mt-2">{item?.desc}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
