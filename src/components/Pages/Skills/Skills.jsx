import Error from "@/components/Utils/Error";
import SeeMoreBtn from "@/components/Utils/SeeMoreBtn";
import React from "react";
import Skill from "./Skill";
import SkillsIcons from "./SkillsIcons";

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
      <SkillsIcons />
      <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => {
          // if (index > limit) {
          //   return;
          // }
          return (
           <Skill item={item} key={index} />
          );
        })}
      </ul>
      {/* {limit == 3 && (
        <div key={"4"} className=" w-full ">
          <SeeMoreBtn link={"/about#skills"} />
        </div>
      )} */}
    </div>
  );
}
