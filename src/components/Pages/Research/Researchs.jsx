import Error from "@/components/Utils/Error";
import React from "react";
import ResearchSlide from "./ResearchSlide";

export default function Researchs({ data, limit }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;

  return (
    <div className=" p-4 grid gap-2 dark:bg-gray-800 bg-gray-300 rounded-lg bg-opacity-80 h-fit ">
      <h1 className=" md:text-5xl text-4xl text-mountain-meadow-500 font-serif">
        Research
      </h1>

    <ResearchSlide data={data} />
    </div>
  );
}
