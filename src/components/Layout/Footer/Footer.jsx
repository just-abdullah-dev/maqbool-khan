import Socials from "@/components/Utils/SocialMediaIcons";
import Link from "next/link";
import React from "react";

export default function Footer({ socials }) {
  const today = new Date();
  const fullYear = today.getFullYear();
  return (
    <footer className=" flex flex-col items-center pt-4 pb-2">
      <div className=" flex items-center w-full">
        <div className=" bg-gray-900 dark:bg-white h-[2px] w-[10%] xsm:w-[25%] sm:w-[40%] md:w-[90%]"></div>
        <Socials
          css={
            " flex bg-white justify-center items-center dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 w-full flex-wrap"
          }
          data={socials}
          altNameCss={"bottom-full group-hover:bottom-[calc(100%+0.7rem)]"}
        />
        <div className=" bg-gray-900 dark:bg-white h-[2px] w-[10%] xsm:w-[25%] sm:w-[40%] md:w-[90%]"></div>
      </div>
      <div>
        <h1 className=" text-center text-lg font-semibold">Maqbool Khan</h1>
        <p className=" flex items-center gap-2 text-sm font-semibold">
          <span className="text-lg">&copy;</span> {fullYear} --- Designed and
          Developed By{" "}
          <Link
            href={"https:just-abdullah.vercel.app"}
            target="_blank"
            className="text-2xl text-mountain-meadow-500"
          >
            &hearts;
          </Link>
        </p>
      </div>
    </footer>
  );
}
