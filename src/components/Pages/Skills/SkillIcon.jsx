'use client';

import React, {useRef} from 'react';
import { motion, useScroll, useTransform } from "framer-motion";


export default function SkillIcon({item}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.3 1", "1.33 0.93"],
    });
    const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.65, 1]);
    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <motion.li
    ref={ref}
     style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className='flex items-center flex-col text-base md:text-xl font-semibold bg-gray-400 dark:bg-gray-800 bg-opacity-30 p-2 rounded-lg' >
        {item?.jsx}{item?.title}
              </motion.li>
  )
}
