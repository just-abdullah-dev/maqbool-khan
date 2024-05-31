'use client';

import React, {useRef} from 'react';
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import getFormatDate from '@/utils/formateDate';

export default function Project({item}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.3 1", "1.33 0.93"],
    });
    const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <motion.li
    ref={ref}
     style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="grid gap-1 border-mountain-meadow-500  rounded-b-3xl p-4 lg:px-8 lg:py-6 border-b-[1.5px] md:border-b-2"
            >
              <div className="">
                <div className=" flex items-center justify-between flex-wrap">
                  <Link
                    target="_blank"
                    href={item?.link}
                    className=" text-xl md:text-2xl font-semibold hover:text-mountain-meadow-500 duration-150"
                  >
                    {item?.title}
                  </Link>
                  <p className=" ">
                    {getFormatDate(item?.from)}---
                    {item?.isCompleted
                      ? getFormatDate(item?.to)
                      : "Currently Working"}
                  </p>
                </div>
                <div className=" font-semibold text-lg">{item?.institute}</div>
              </div>
              <div className="">
                <h1 className=" text-lg md:text-xl font-semibold text-mountain-meadow-500">
                  Responsibilities:
                </h1>
                <ul className=" px-6">
                  {item?.responsibilities.map((ele, index) => {
                    return (
                      <li key={index} className="">
                        {ele}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p className=" mt-2">{item?.desc}</p>
            
      </motion.li>
  )
}
