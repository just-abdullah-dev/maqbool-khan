"use client";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleUpdatePassword() {
    setIsLoading(true);
    if (oldPassword === "") {
      toast.error("Type old password!");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password & confirm password does not match.");
      setIsLoading(false);
      return;
    }

    const body = {
      oldPassword,
      newPassword: password,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
      body: JSON.stringify(body),
      redirect: "follow",
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/personal/changePassword/${userInfo?.data?.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      })
      .catch((error) => console.log("error", error));
    setIsLoading(false);
  }

  return (
    <div
      className={`${"flex items-center justify-center gap-6"} relative w-full pt-4`}
    >
      <div className="grid gap-6 w-[400px]">
        <h1 className="text-2xl font-semibold">Change Password</h1>
        <div className=" grid gap-4">
          <div className="relative">
            <input
autoComplete="on"

              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              className="inputTag w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Old Password"
            />
            {showPassword ? (
              <button
                className="absolute right-4 bottom-2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              >
                <Eye />
              </button>
            ) : (
              <button
                className="absolute right-4 bottom-2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              >
                <EyeOff />
              </button>
            )}
          </div>
          <div className="relative">
            <input
autoComplete="on"

              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="inputTag w-full"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
            />
            {showPassword ? (
              <button
                className="absolute right-4 bottom-2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              >
                <Eye />
              </button>
            ) : (
              <button
                className="absolute right-4 bottom-2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              >
                <EyeOff />
              </button>
            )}
          </div>
          <div className="relative">
            <input
autoComplete="on"

              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="inputTag w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your new password"
            />
            {showPassword ? (
              <button
                className="absolute right-4 bottom-2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              >
                <Eye />
              </button>
            ) : (
              <button
                className="absolute right-4 bottom-2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              >
                <EyeOff />
              </button>
            )}
          </div>
        </div>

        {/* update btn  */}
        <button
          disabled={isLoading}
          className="actionButtonTag w-full"
          onClick={handleUpdatePassword}
        >
          {isLoading ? <Loader2Icon className="animate-spin" /> : "Update"}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ChangePassword), { ssr: false });
