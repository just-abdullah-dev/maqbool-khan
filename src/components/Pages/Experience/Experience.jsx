'use client';

import getFormatDate from '@/utils/formateDate';
import Link from 'next/link';
import React, {useRef} from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

export default function Experience({item}) {
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
      className='grid gap-1 border-mountain-meadow-500 pl-6  relative'>
        
        <div className=" w-5 h-5 bg-mountain-meadow-500 rounded-full absolute -left-3 top-1"></div>
                    <div>
                    <div className=' flex items-center justify-between flex-wrap'>
                        <h1 className=' text-xl md:text-2xl font-semibold'>{item?.title}</h1>
                        <p className=' '>
                            {getFormatDate(item?.from)} - {" "}
                            {item?.to ? getFormatDate(item?.to) : "Present"}
                        </p>
                    </div>
                    <Link
                    href={item?.link}
                    target='_blank'
                    className=' text-lg font-semibold hover:text-mountain-meadow-500 duration-150'>{item?.company}</Link>
                    </div>
                    <p className=' pr-6 leading-6 dark:text-gray-300 text-gray-700'>{item?.desc}</p>
                </motion.li>
  )
}
