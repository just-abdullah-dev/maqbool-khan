'use client';

import React, {useRef} from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

export default function Skill({item}) {
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
      className=" grid gap-1 border-mountain-meadow-500  rounded-b-3xl p-4 lg:px-8 lg:py-6 border-b-[1.5px] md:border-b-2"
            >
              <h1 className=" text-xl md:text-2xl font-semibold">{item?.title}</h1>

              <ul className=" px-6">
                {item?.items.map((ele, index) => {
                  return (
                    <li key={index} className="">
                      {ele}
                    </li>
                  );
                })}
              </ul>
              </motion.li>
  )
}
