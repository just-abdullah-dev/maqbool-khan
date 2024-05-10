"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function DashboardContent() {
  let { userInfo } = useSelector((state) => state.user);
  userInfo = userInfo?.data;
  return (
    <div className=" flex items-center justify-center h-96 mt-12">
      <div className=" w-full text-4xl font-bold px-6 py-12 bg-mountain-meadow-600 grid gap-6">
        <h1 className=" text-center text-5xl text-white">
          Content Management System
        </h1>
        <div className=" dark:text-gray-900 text-white">
          <h1 className="">
            <span className="">Welcome</span> <span className="">Back!</span>
          </h1>
          <h1 className=" text-center">
            {userInfo?.name?.title}. {userInfo?.name?.first}{" "}
            {userInfo?.name?.last}
          </h1>
        </div>
      </div>
    </div>
  );
}
