import Error from "@/components/Utils/Error";
import SeeMoreBtn from "@/components/Utils/SeeMoreBtn";
import getFormatDate from "@/utils/formateDate";
import Link from "next/link";
import React from "react";
import Project from "./Project";

export default function Projects({ data, limit }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;

  return (
    <div className="p-4 lg:p-12 grid gap-2">
      <h1 className=" md:text-5xl text-4xl text-mountain-meadow-500 font-serif">Projects</h1>
      <ul className="grid gap-6 md:grid-cols-2 ">
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
            <Project key={index} item={item} />
          );
        })}
      </ul>
    </div>
  );
}
