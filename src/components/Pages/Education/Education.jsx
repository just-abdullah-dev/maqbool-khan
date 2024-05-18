import Error from "@/components/Utils/Error";
import SeeMoreBtn from "@/components/Utils/SeeMoreBtn";
import getFormatDate from "@/utils/formateDate";
import React from "react";

export default function Education({ data, limit }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;

  return (
    <div className="p-4 lg:p-12 grid gap-4">
      <h1 className=" text-5xl lg:text-6xl text-mountain-meadow-500 font-serif relative">
        <div className="absolute bottom-0 left-0 h-[51%] z-50 w-[430px] bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40"></div>
        EDUCATION
      </h1>
      <ul className="grid gap-8">
        {data.map((item, index) => {
          if (index > limit) {
            return;
          }
          if (index === limit) {
            return (
              <li key={index} className=" w-full ">
                <SeeMoreBtn link={"/about#education"} />
              </li>
            );
          }
          return (
            <li
              key={index}
              className="grid gap-3 hover:bg-mountain-meadow-200 dark:hover:bg-mountain-meadow-900 dark: hover:bg-opacity-50 border border-mountain-meadow-500  rounded-3xl p-4 lg:px-8 lg:py-6 transition-all duration-300"
            >
              <div className=" flex items-center justify-between flex-wrap">
                <h1 className=" text-2xl font-semibold">{item?.degree}</h1>
                <h1 className=" text-2xl font-semibold">{item?.field}</h1>
                <p className=" ">
                  {getFormatDate(item?.from)}---
                  {item?.to ? getFormatDate(item?.to) : "Currently Enrolled"}
                </p>
              </div>
              <div className=" flex items-center gap-2 text-xl flex-wrap">
                <h1 className=" font-semibold">{item?.institute},</h1>
                <h1 className=" font-bold">{item?.country}</h1>
              </div>
              <p className=" px-6 leading-6 dark:text-gray-300 text-gray-700">
                {item?.desc}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
