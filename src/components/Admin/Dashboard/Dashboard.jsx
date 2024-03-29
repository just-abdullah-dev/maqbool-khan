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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard({ children }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo?.success) {
      toast.error("Kindly login first!");
      router.push("/admin/pin/login");
    }
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
  ];

  return (
    <div className=" flex items-start">
      <div
        className={`${
          openSidebar
            ? "w-[64%] sm:w-[44%] md:w-[30%] lg:w-[16%] p-2"
            : "w-[10%] sm:w-[8%] md:w-[6%] lg:w-[4%]"
        } transition-all duration-1000 border-r h-screen border-black dark:border-white flex flex-col gap-4 overflow-hidden`}
      >
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
              } flex items-center gap-4 bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 py-2`}
            >
              <ChevronLeftIcon className="" size={36} />
              <p className="">Close Sidebar</p>
            </div>
          ) : (
            <div className="bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 py-2 pl-2">
              <ChevronRightIcon className="" size={36} />
            </div>
          )}
        </button>
        {options.map((opt, index) => {
          return (
            <Link
              className={`${
                !openSidebar && " justify-center"
              } flex items-center gap-4 hover:scale-105 duration-300`}
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
        <button
          className={`${
            !openSidebar && " justify-center"
          } flex items-center gap-4 dark:text-red-500 text-red-600 hover:scale-105 duration-300`}
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
        } transition-all duration-1000 h-fit min-h-screen`}
      >
        {children}
      </div>
    </div>
  );
}
