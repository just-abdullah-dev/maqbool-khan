'use client';

import getFormatDate from '@/utils/formateDate';
import React, {useRef} from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

export default function GalleryTile({item}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.3 1", "1.15 0.93"],
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
    className={`grid gap-1 border-mountain-meadow-500  rounded-b-3xl p-4 lg:px-8 lg:py-6 border-b-[1.5px] md:border-b-2`}
  >
    <div className=" flex items-center justify-between flex-wrap">
      <h1 className=" text-xl md:text-2xl font-semibold">{item?.degree}</h1>
      <h1 className=" text-xl md:text-2xl font-semibold">{item?.field}</h1>
      <p className=" ">
        {getFormatDate(item?.from)}---
        {item?.to ? getFormatDate(item?.to) : "Currently Enrolled"}
      </p>
    </div>
    <div className=" flex items-center gap-2 text-lg md:text-xl flex-wrap">
      <h1 className=" font-semibold dark:text-gray-300 text-gray-700">{item?.institute},</h1>
      <h1 className=" font-bold">{item?.country}</h1>
    </div>
    <p className=" px-6 leading-6 dark:text-gray-300 text-gray-700">
      {item?.desc}
    </p>
  </motion.li>
  )
}
