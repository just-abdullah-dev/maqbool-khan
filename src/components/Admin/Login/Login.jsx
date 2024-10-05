"use client";
import { userActions } from "@/store/reducers/userReducer";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassowrd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const main = async () => {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo?.data?.token}`,
        },
        redirect: "follow",
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/session`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.success) {
            toast("Already logged in!", {
              icon: "🔓",
            });
            router.push("/admin/pin/dashboard");
          }
        })
        .catch((error) => console.log("error", error));
    };
    main();
  }, []);

  const handleLogin = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (!username || !password) {
        toast.error("Kindly fill the feilds.");
        setIsLoading(false);
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: username, password }),
      });
      const data = await res.json();
      if (data?.success) {
        toast.success(data?.message);
        dispatch(userActions.setUserInfo(data));
        localStorage.setItem("account", JSON.stringify(data));
        router.push("/admin/pin/dashboard");
      } else {
        toast.error(data?.message);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.message);
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="md:flex py-24 grid gap-6 md:py-0 p-4 h-[600px]">
      <div className=" w-full md:w-1/3 flex items-center justify-center">
        <div className=" grid gap-4">
          <h1 className=" text-6xl font-bold">CMS</h1>
          <h2 className=" text-xl">(Content Management System)</h2>
          <Link
            target="_blank"
            href={"https://just-abdullah.vercel.app"}
            className=" text-lg font-semibold"
          >
            By Just Abdullah
          </Link>
        </div>
      </div>
      <div className=" w-full md:w-2/3 flex items-center justify-center overflow-x-hidden overflow-y-visible">
        <div className="w-[400px] grid gap-6">
          <h2 className=" text-2xl font-semibold">Login</h2>
          <form
            className=" grid gap-6"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <div className=" ">
              <input
                autoComplete="on"
                className="inputTag w-full"
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative ">
              <input
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputTag w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
              />
              {showPassword ? (
                <a
                  className="absolute right-4 bottom-2 cursor-pointer"
                  onClick={() => setShowPassowrd(false)}
                >
                  <Eye />
                </a>
              ) : (
                <a
                  className="absolute right-4 bottom-2 cursor-pointer"
                  onClick={() => setShowPassowrd(true)}
                >
                  <EyeOff />
                </a>
              )}
            </div>
            <button
              disabled={isLoading}
              className="actionButtonTag w-full "
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
