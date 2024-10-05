"use client";
import { logout } from "@/store/actions/user";
import {
  BriefcaseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileBadge2,
  GraduationCap,
  Images,
  LayoutDashboard,
  LogOut,
  NotebookText,
  SearchCheck,
  Sparkles,
  SquareGantt,
  UserRound,
  UserRoundCog,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../AdminHeader";
import toast from "react-hot-toast";

export default function Dashboard({ children }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const arr = pathname.split("/");
  const currentWindow = arr[arr.length-1];

  useEffect(() => {
    const main = async () => {
      if (!userInfo?.success) {
        router.push("/admin/pin/login");
        return;
      }
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
        if (!result?.success) {
          toast.error(result?.message);
          router.push("/admin/pin/login");
        }
      })
      .catch((error) => console.log("error", error));
    }
    main();
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/admin/pin/login");
  };

  const [openSidebar, setOpenSidebar] = useState(true);
  const options = [
    {
      name: "Dashboard",
      path: "dashboard",
      icon: <LayoutDashboard size={28} />,
    },
    {
      name: "Profile",
      path: "profile",
      icon: <UserRound size={28} />,
    },
    {
      name: "Experience",
      path: "experience",
      icon: <BriefcaseIcon size={28} />,
    },
    {
      name: "Education",
      path: "education",
      icon: <GraduationCap size={28} />,
    },
    {
      name: "Skills",
      path: "skills",
      icon: <UserRoundCog size={28} />,
    },
    {
      name: "Publications",
      path: "publications",
      icon: <NotebookText size={28} />,
    },
    {
      name: "Certifications",
      path: "certifications",
      icon: <FileBadge2 size={28} />,
    },
    {
      name: "Specializations",
      path: "specializations",
      icon: <Sparkles size={28} />,
    },
    {
      name: "Projects",
      path: "projects",
      icon: <SquareGantt size={28} />,
    },
    {
      name: "Research",
      path: "research",
      icon: <SearchCheck size={28} />,
    },
    { name: "Gallery", path: "gallery", icon: <Images size={28} /> },
    { name: "People", path: "people", icon: <UsersRound size={28} /> },
  ];

  return (
    <div className="">
      <AdminHeader />
      <div className=" flex items-start">
      <div
        className={`${
          openSidebar
            ? "w-[64%] sm:w-[44%] md:w-[30%] lg:w-[16%]"
            : "w-[10%] sm:w-[8%] md:w-[6%] lg:w-[4%]"
        } h-screen overflow-hidden `}
      ></div>
      <div
        className={`${
          openSidebar
            ? "w-[64%] sm:w-[44%] md:w-[30%] lg:w-[16%]"
            : "w-[10%] sm:w-[8%] md:w-[6%] lg:w-[4%]"
        } border-r h-screen border-black dark:border-white flex flex-col overflow-hidden fixed top-12 z-50 transition-all duration-1000 `}
      >
          {/* side bar open & close btn  */}
        <button
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
          title={openSidebar ? "Close Sidebar" : "Open Sidebar"}
          className="hover:scale-105 duration-300"
        >
          {openSidebar ? (
            <div
              className={`${
                !openSidebar && " justify-center"
              } flex items-center gap-4 bg-gray-700 text-gray-300 dark:bg-gray-300 dark:text-gray-800 py-2`}
            >
              <ChevronLeftIcon className="" size={32} />
              <p className="">Close Sidebar</p>
            </div>
          ) : (
            <div className="bg-gray-700 text-gray-300 dark:bg-gray-300 dark:text-gray-800 py-2 pl-2">
              <ChevronRightIcon className="" size={32} />
            </div>
          )}
        </button>
        {/* all options  */}
        {options.map((opt, index) => {
          return (
            <Link
              className={`${
                !openSidebar && " justify-center"
              } ${currentWindow === opt?.path && " bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800"} 
              flex items-center gap-4 hover:scale-105 duration-300 py-2 px-2`}
              href={
                opt?.path === "dashboard"
                  ? `/admin/pin/${opt?.path}`
                  : `/admin/pin/dashboard/${opt?.path}`
              }
              key={index}
              title={opt?.name}
            >
              {opt?.icon}
              {openSidebar && opt?.name}
            </Link>
          );
        })}
        {/* logout btn  */}
        <button
          className={`${
            !openSidebar && " justify-center"
          } flex items-center gap-4 dark:text-red-500 text-red-600 hover:scale-105 duration-300 px-2`}
          key={"Log Out"}
          title={"Log Out"}
          onClick={logoutHandler}
        >
          <LogOut size={28} />
          {openSidebar && <p>Log Out</p>}
        </button>
        
      </div>
      <div
        className={`${
          openSidebar
            ? "w-[36%] sm:w-[56%] md:w-[70%] lg:w-[84%]"
            : "w-[90%] sm:w-[92%] md:w-[94%] lg:w-[96%]"
        } transition-all duration-1000 h-fit min-h-screen mt-16`}
      >
        {children}
      </div>
    </div>
    </div>
  );
}
