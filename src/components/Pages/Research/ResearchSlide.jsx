'use client';

import React, {useRef} from 'react';
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon } from 'lucide-react';

export default function ResearchSlide({data}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["0.3 1", "1.15 1"],
    });
    // const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    const slideProgress = useTransform(scrollYProgress, [0, 1], [250, 0]);
  return (
    <motion.div
    ref={ref}
     style={{
        // scale: scaleProgess,
        opacity: opacityProgess,
        y: slideProgress
      }}
      className=" "
      >
          <div className=" grid gap-4">
       {data[0]?.interest.length > 0 &&
        <div className=" grid gap-1">
        <h1 className=" text-mountain-meadow-500 text-lg font-semibold">
          Research Interest
        </h1>
        <div className=" pl-4">
          {data[0]?.interest.map((item, index) => {
            return (
              <div key={index} className=" flex items-start gap-2">
                <ArrowRightIcon className=" mt-1" size={20} /> {item}
              </div>
            );
          })}
        </div>
      </div>}
        {data[0]?.reviewer.length > 0 &&
        <div className=" grid gap-1">
        <h1 className=" text-mountain-meadow-500 text-lg font-semibold">
          Reviewer
        </h1>
        <div className=" pl-4">
          {data[0]?.reviewer.map((item, index) => {
            return (
              <div key={index} className=" flex items-start gap-2">
                <ArrowRightIcon className=" mt-1" size={20} /> {item}
              </div>
            );
          })}
        </div>
      </div>}
        <div className=" grid grid-cols-1 md:grid-cols-2">
          
         {data[0]?.organizationChair.length > 0 &&
          <div className=" grid gap-1">
          <h1 className=" text-mountain-meadow-500 text-lg font-semibold">
            Organising Chair
          </h1>
          <div className=" pl-4">
            {data[0]?.organizationChair.map((item, index) => {
              return (
                <div key={index} className=" flex items-start gap-2">
                  <ArrowRightIcon className=" mt-1" size={20} /> {item}
                </div>
              );
            })}
          </div>
        </div>}

         {data[0]?.sessionChair.length > 0 &&
          <div className=" grid gap-1">
          <h1 className=" text-mountain-meadow-500 text-lg font-semibold">
            Session Chair
          </h1>
          <div className=" pl-4">
            {data[0]?.sessionChair.map((item, index) => {
              return (
                <div key={index} className=" flex items-start gap-2">
                  <ArrowRightIcon className=" mt-1" size={20} /> {item}
                </div>
              );
            })}
          </div>
        </div>}
        </div>

        {/* research member  */}
        {data[0]?.members.length > 0 && (
          <div className=" grid gap-1">
            <h1 className=" text-mountain-meadow-500 text-lg font-semibold">
              Member
            </h1>
            <ul className=" px-4">
              {data[0]?.members.map((member, index) => {
                return (
                  <li key={index} className=" flex items-center gap-2">
                    <ArrowRightIcon size={19} />
                    <div>
                      <h1>{member?.title}</h1>
                      <Link href={member?.link} className=" text-blue-500">
                        {member?.link}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      </motion.div>
  )
}
