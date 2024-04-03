"use client";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ChangePassword() {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  async function handleUpdatePassword() {
    setIsLoading(true);
    if (password !== confirmPassword) {
      alert("Password & confirm password does not match.");
      setIsLoading(false);
      return;
    }

    var formdata = new FormData();
    const body = {
      password: password,
    };
    formdata.append("document", JSON.stringify(body));

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
      body: formdata,
      redirect: "follow",
    };

    await fetch("/api/users/updateProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.success) {
          toast.success("Password Changed!");
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => console.log("error", error));
      setIsEdit(false);
    setIsLoading(false);
  }

  return (
    <div
      className={`${"flex items-center justify-center gap-6"} relative w-full`}
    >
      {/* edit btn  */}
      {!isEdit && (
        <button 
        className="actionButtonTag"
        onClick={() => {
          setIsEdit(true);
        }}
        >
          Change Password?
        </button>
        
      )}
      {isEdit && (
        <div className="grid gap-6 w-[300px]">
          <h1 className="text-xl font-bold">Change Password</h1>
          <div className=" grid gap-4">
          <div className="relative">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="inputTag w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your new password"
                />
                {showPassword ? (
                  <button
                    className="absolute right-6 bottom-3 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  >
                    <Eye />
                  </button>
                ) : (
                  <button
                    className="absolute right-6 bottom-3 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  >
                    <EyeOff />
                  </button>
                )}
              </div>
              <div className="relative">
                <input
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
                    className="absolute right-6 bottom-3 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  >
                    <Eye />
                  </button>
                ) : (
                  <button
                    className="absolute right-6 bottom-3 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  >
                    <EyeOff />
                  </button>
                )}
              </div>

        </div>

        {/* update and close btn  */}
        <div className="flex items-center gap-6 justify-center w-full">
          <button
            className="normalButtonTag bg-red-500 w-[40%]"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            Close
          </button>
          <button
            disabled={isLoading}
            className="actionButtonTag w-[40%]"
            onClick={handleUpdatePassword}
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Update"}
          </button>
        </div>
        </div>
      )}

      
    </div>
  );
}

export default dynamic(() => Promise.resolve(ChangePassword), { ssr: false });
