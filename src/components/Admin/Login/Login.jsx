"use client";
import { userActions } from "@/store/reducers/userReducer";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassowrd] = useState(false);
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   if(userInfo?.success){
  //     toast('Already logged in!', {
  //       icon: '🔓',
  //     });
  //     router.push('/');
  //   }
  // },[]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!username || !password) {
        toast.error("Kindly fill the feilds.");
        return;
      }
      const res = await fetch("/api/auth/login", {
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
    } catch (error) {
      toast.error(error?.message)
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <div>Content Management System of maqboolkhan.com</div>
      <div>
        <div>
          <h2>Login</h2>
          <form
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <div>
              <input
                className="inputTag w-full"
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputTag w-full"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
              />
              {showPassword ? (
                <a
                  className="absolute right-6 bottom-3 cursor-pointer"
                  onClick={() => setShowPassowrd(false)}
                >
                  <Eye />
                </a>
              ) : (
                <a
                  className="absolute right-6 bottom-3 cursor-pointer"
                  onClick={() => setShowPassowrd(true)}
                >
                  <EyeOff />
                </a>
              )}
            </div>
            <button className="actionButtonTag" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
