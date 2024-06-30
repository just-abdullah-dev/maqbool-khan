'use client';

import getFormatDate from '@/utils/formateDate';
import React, {useRef} from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

export default function Education({item}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.3 1", "1 0.98"],
    });
    // const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.75, 1]);

    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
    
    const slideProgress = useTransform(scrollYProgress, [0, 1], [250, 0]);

  return (
    <motion.li
    ref={ref}
     style={{
        // scale: scaleProgess,
        opacity: opacityProgess,
        y: slideProgress
      }}
    className={`grid gap-1 border-mountain-meadow-500 pl-6  relative`}
  >
    <div className=" w-5 h-5 bg-mountain-meadow-500 rounded-full absolute -left-3 top-1"></div>

    <div className=" flex items-center justify-between flex-wrap">
      <h1 className=" text-xl md:text-2xl font-semibold">{item?.degree}</h1>
      <p className=" ">
        {getFormatDate(item?.from)} - {" "}
        {item?.to ? getFormatDate(item?.to) : "Currently Enrolled"}
      </p>
    </div>
    <h1 className=" text-xl font-semibold">{item?.field}</h1>
    <div className=" flex items-center gap-2 text-lg flex-wrap">
      
      <h1 className=" font-semibold dark:text-gray-300 text-gray-700">{item?.institute},</h1>
      <h1 className=" font-bold">{item?.country}</h1>
    </div>
    <p className=" pr-6 leading-6 dark:text-gray-300 text-gray-700">
      {item?.desc}
    </p>
  </motion.li>
  )
}
