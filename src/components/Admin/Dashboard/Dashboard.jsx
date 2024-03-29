"use client";
import {
  BriefcaseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileBadge2,
  GraduationCap,
  Images,
  LayoutDashboard,
  NotebookText,
  SearchCheck,
  Sparkles,
  SquareGantt,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Dashboard({ children }) {
  const [openSidebar, setOpenSidebar] = useState(true);
  const options = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: <LayoutDashboard size={30} />,
      },
    {
      name: "Profile",
      path: "dashboard/profile",
      icon: <UserRound size={30} />,
    },
    {
      name: "Experience",
      path: "dashboard/experience",
      icon: <BriefcaseIcon size={30} />,
    },
    {
      name: "Education",
      path: "dashboard/education",
      icon: <GraduationCap size={30} />,
    },
    {
      name: "Skills",
      path: "dashboard/skills",
      icon: <UserRoundCog size={30} />,
    },
    {
      name: "Publications",
      path: "dashboard/publications",
      icon: <NotebookText size={30} />,
    },
    {
      name: "Certifications",
      path: "dashboard/certifications",
      icon: <FileBadge2 size={30} />,
    },
    {
      name: "Specializations",
      path: "dashboard/specializations",
      icon: <Sparkles size={30} />,
    },
    {
      name: "Projects",
      path: "dashboard/projects",
      icon: <SquareGantt size={30} />,
    },
    {
      name: "Research",
      path: "dashboard/research",
      icon: <SearchCheck size={30} />,
    },
    { name: "Gallery", path: "dashboard/gallery", icon: <Images size={30} /> },
  ];

  return (
    <div className=" flex items-start">
      <div
        className={`${
          openSidebar ? "w-[12%]" : "w-[4%] pl-"
        } transition-all duration-1000 border-r h-screen border-black dark:border-white flex flex-col gap-4 overflow-hidden p-`}
      >
        <button
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
          title={openSidebar ? "Close Sidebar" : "Open Sidebar"}
        >
          {openSidebar ?
        <div className=" flex items-center gap-4 bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 py-2">
        <ChevronLeftIcon className="pl-2" size={38}/><p className="">Close Sidebar</p></div>:
        <div className="bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 py-2">
          <ChevronRightIcon className="pl-2" size={38}/>
        </div>

        }
        </button>
        {options.map((opt, index) => {
          return (
            <Link
              className=" flex items-center gap-4 px-3"
              href={opt?.path}
              key={index}
              title={opt?.name}
            >
              {opt?.icon}
              {openSidebar && opt?.name}
            </Link>
          );
        })}
      </div>
      <div
        className={`${
          openSidebar ? "w-[88%]" : "w-[96%]"
        } transition-all duration-1000 h-fit min-h-screen`}
      >
        {children}
        
      </div>
    </div>
  );
}
