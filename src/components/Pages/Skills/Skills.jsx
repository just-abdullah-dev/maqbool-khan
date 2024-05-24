import Error from "@/components/Utils/Error";
import SeeMoreBtn from "@/components/Utils/SeeMoreBtn";
import React from "react";

export default function Skills({ data, limit }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;

  return (
    <div className="p-4 lg:p-12 grid gap-2">
      <h1 className=" text-5xl lg:text-6xl text-mountain-meadow-500 font-serif relative">
        <div className="absolute bottom-0 left-0 h-[51%] z-50 w-[330px] bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40"></div>
        SKILLS
      </h1>
      <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => {
          if (index > limit) {
            return;
          }
          return (
            <li
              key={index}
              className=" grid gap-1 border-mountain-meadow-500  rounded-b-3xl p-4 lg:px-8 lg:py-6 border-b-[1.5px] md:border-b-2"
            >
              <h1 className=" text-xl md:text-2xl font-semibold">{item?.title}</h1>

              <ul className=" px-6">
                {item?.items.map((ele, index) => {
                  return (
                    <li key={index} className="">
                      {ele}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      {limit == 3 && (
        <div key={"4"} className=" w-full ">
          <SeeMoreBtn link={"/about#skills"} />
        </div>
      )}
    </div>
  );
}
