"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function DashboardContent() {
  let { userInfo } = useSelector((state) => state.user);
  userInfo = userInfo?.data;
  return (
    <div>
      <div>
        <h1>Welcome Back!</h1>
        <h1>
          {userInfo?.name?.title}. {userInfo?.name?.first} {userInfo?.name?.last}
        </h1>
      </div>
    </div>
  );
}
