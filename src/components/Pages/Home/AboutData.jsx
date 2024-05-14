import Error from "@/components/Utils/Error";
import Image from "next/image";
import React from "react";

export default function AboutData({ data }) {
  if (!data?.success) {
    return <Error message={data?.message} />;
  }
  data = data?.data;
  console.log(data);

  return (
    <div
      id="about-div"
      className=" flex p-32 relative w-full bg-cover bg-center h-screen"
    >
      <div className=" bg-black opacity-30 w-full absolute top-0 left-0 z-20 h-screen"></div>

      <div className=" flex items-center justify-center z-40 w-2/3 p-6 bg-gray-800 bg-opacity-25 rounded-3xl">
        <div className=" h-fit p-6 w-full grid gap-4 text-white">
          <h1 className=" flex items-center gap-2 font-bold text-5xl text-mountain-meadow-500">
            {data?.name?.title && <span>{data?.name?.title}.</span>}
            {data?.name?.first && (
              <span className=" ">{data?.name?.first}</span>
            )}
            {data?.name?.middle && <span>{data?.name?.middle}</span>}
            {data?.name?.last && <span>{data?.name?.last}</span>}
          </h1>
          <h3 className="">{data?.bio}</h3>
          {/* current pos  */}
          <div className=" ">
            <h3 className=" font-semibold text-2xl">
              {data?.currentPosition?.title}
            </h3>
            <p className=" font-semibold">{data?.currentPosition?.at}</p>
          </div>
          <p>{data?.about}</p>
        </div>
      </div>

    </div>
  );
}
