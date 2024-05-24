import Error from '@/components/Utils/Error';
import SeeMoreBtn from '@/components/Utils/SeeMoreBtn';
import getFormatDate from '@/utils/formateDate';
import Link from 'next/link';
import React from 'react';

export default function Experience({data, limit}) {
    if (!data?.success) {
        return <Error message={data?.message} />;
      }
      data = data?.data;
    
  return (
    <div className='p-4 lg:p-12 grid gap-2'>
        <h1 className=' text-5xl lg:text-6xl text-mountain-meadow-500 font-serif relative'>
        <div className='absolute bottom-0 left-0 h-[51%] z-50 w-[430px] bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-40'></div>
            EXPERIENCE</h1>
        <ul className='grid'>
            {data.map((item, index) => {
                if(index > limit){
                    return;
                }
                if(index === limit){
                    return <li key={index} className=' w-full mt-4'>
                       <SeeMoreBtn link={"/about#experience"} />
                    </li>;
                }
                return <li key={index} className='grid gap-1 border-mountain-meadow-500  rounded-b-3xl p-4 lg:px-8 lg:py-6 border-b-[1.5px] md:border-b-2'>
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
                </li>
            })}
        </ul>
    </div>
  )
}
