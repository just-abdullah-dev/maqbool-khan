'use client';

import getFormatDate from '@/utils/formateDate';
import Link from 'next/link';
import React, {useRef} from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

export default function Experience({item}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.3 1", "1.33 0.93"],
    });
    const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

    // const slideProgress = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <motion.li
    ref={ref}
     style={{
        scale: scaleProgess,
        opacity: opacityProgess,
        // x: slideProgress
      }}
      className='grid gap-1 border-mountain-meadow-500  rounded-b-3xl p-4 lg:px-8 lg:py-6 border-b-[1.5px] md:border-b-2'>
                    <div>
                    <div className=' flex items-center justify-between flex-wrap'>
                        <h1 className=' text-xl md:text-2xl font-semibold'>{item?.title}</h1>
                        <p className=' '>
                            {getFormatDate(item?.from)}---
                            {item?.to ? getFormatDate(item?.to) : "Present"}
                        </p>
                    </div>
                    <Link
                    href={item?.link}
                    target='_blank'
                    className=' text-lg font-semibold hover:text-mountain-meadow-500 duration-150'>{item?.company}</Link>
                    </div>
                    <p className=' px-6 leading-6 dark:text-gray-300 text-gray-700'>{item?.desc}</p>
                </motion.li>
  )
}
