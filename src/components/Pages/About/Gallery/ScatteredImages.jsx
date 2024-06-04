'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

// side (left || right)
const ScatteredImages = ({images, side}) => {
  console.log(images);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.3 1", "1.15 0.90"],
  });
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const slideProgress = useTransform(scrollYProgress, [0, 1], [side === "left" ? 100: -100, 0]);

      function getRandomNumber() {
        return Math.floor(Math.random() * 6);
      }
      
  return (
    <motion.div
    ref={ref}
     style={{
        opacity: opacityProgess,
        x: slideProgress
      }}
  >
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-24">
          {images.map((item, i) => {
            const index = getRandomNumber();
            return (
              <Link
              className=" relative"
              href={`/about/gallery/${item?.slug}`}
              key={i}>
              <Image
                width={500}
                height={500}
                src={`/uploads${item?.path}`}
                alt={`Image ${index + 1}`}
                className={`w-full h-auto bg-mountain-meadow-500 p-[.5px] rounded-xl`}
                style={{
                  position: "relative",
                  left: `${(index % 3) * 20}px`,
                  top: `${(index % 3) * 15}px`,
                  zIndex: -index,
                  transform: `rotate(${(index % 6) * 10 - 20}deg)`,
                }}
              />
              <h1
              style={{
                position: "absolute",
                left: `${(index % 3) * 30}px`,
                top: `${(index % 3) * 15}px`,
                zIndex: -index,
                transform: `rotate(${(index % 6) * 10 - 20}deg)`,
              }}
              className=" text-xl font-semibold px-2 py-1 bg-gray-600 bg-opacity-30 w-fit"
              >
                {item?.countryName}
              </h1>
              </Link>
            );
          })}
        </div>
    </motion.div>
  );
};

export default ScatteredImages;
