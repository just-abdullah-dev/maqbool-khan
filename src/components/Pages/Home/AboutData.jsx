import Error from "@/components/Utils/Error";
import Link from "next/link";
import React from "react";
import BGSlideImages from "./BGSlideImages";

export default function AboutData({ data }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;
  
  return (
    <div className=" flex py-6 px-3 lg:p-32 relative w-full lg:h-[650px] h-[450px] overflow-hidden">
      <BGSlideImages
        images={data?.bgImages !== null || undefined ? data?.bgImages : []}
        className={"w-full absolute top-0 left-0 lg:h-[650px] h-[450px]"}
      />

      <div className=" z-40 w-full md:w-2/3 bg-gray-800 bg-opacity-50 h-fit rounded-3xl mx-2 my-auto">
        <div className=" h-fit lg:p-6 py-6 px-3 w-fit grid gap-4 text-white">
          <h1 className=" flex items-center flex-wrap gap-2 font-bold lg:text-6xl w-fit relative text-5xl text-mountain-meadow-500">
            {data?.name?.title && <span>{data?.name?.title}.</span>}
            {data?.name?.first && (
              <span className=" ">{data?.name?.first}</span>
            )}
            {data?.name?.middle && <span>{data?.name?.middle}</span>}
            {data?.name?.last && <span>{data?.name?.last}</span>}
            <div className="border-white border-b-[3px] absolute -bottom-1 right-0 left-0 -z-10"></div>
          </h1>
          <h3 className="">{data?.bio}</h3>
          {/* current pos  */}
          <div className=" ">
            <h3 className=" font-semibold text-xl lg:text-2xl">
              {data?.currentPosition?.title}
            </h3>
            <p className=" font-semibold text-sm  lg:text-md">
              {data?.currentPosition?.at}
            </p>
          </div>
          <p className="text-sm leading-6 lg:text-base">{data?.about}</p>
          <div className=" flex items-center gap-6">
            <Link
              target="_blank"
              href={`/uploads/${data?.cv}`}
              download={`/uploads/${data?.cv}`}
              className=" actionButtonTag w-36"
            >
              Download CV
            </Link>
            
          <Link
              target="_blank"
              href={`/contact`}
              className=" actionButtonTag w-36"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
