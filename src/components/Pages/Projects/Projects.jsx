import Error from '@/components/Utils/Error';
import SeeMoreBtn from '@/components/Utils/SeeMoreBtn';
import getFormatDate from '@/utils/formateDate';
import Link from 'next/link';
import React from 'react';

export default function Projects({data, limit}) {
    if (!data?.success) {
        return <Error message={data?.message} />;
      }
      data = data?.data;
      console.log(data);
    
  return (
    <div className='p-4 lg:p-12 grid gap-4'>
        <h1 className=' text-5xl lg:text-6xl text-mountain-meadow-500 font-serif'>Projects</h1>
        <ul className='grid gap-8'>
            {data.map((item, index) => {
                if(index === limit){
                    return <li key={index} className=' w-full '>
                       <SeeMoreBtn link={"/projects"} />
                    </li>;
                }
                return <li key={index} className='grid gap-3 hover:bg-mountain-meadow-200 dark:hover:bg-mountain-meadow-900 dark: hover:bg-opacity-50 border border-mountain-meadow-500 cursor-pointer rounded-3xl p-4 lg:px-8 lg:py-6 transition-all duration-300'>
                    <div className=''>
                    <div className=' flex items-center justify-between flex-wrap'>
                        <Link target='_blank' href={item?.link} className=' text-2xl font-semibold hover:text-mountain-meadow-500 duration-150'>{item?.title}</Link>
                        <p className=' '>
                            {getFormatDate(item?.from)}---
                            {item?.isCompleted ? getFormatDate(item?.to) : "Currently Working"}
                        </p>
                    </div>
                    <div className=' font-semibold text-lg'>{item?.institute}</div>
                    </div>
                    <div className=''>
                        <h1 className=' text-2xl font-semibold text-mountain-meadow-500'>Responsibilities:</h1>
                        <ul className=' px-6'>
                            {item?.responsibilities.map((ele, index)=>{
                                return <li key={index} className=''>
                                    {ele}
                                </li>
                            })}
                        </ul>
                    </div>
                    <p>{item?.desc}</p>
                </li>
            })}
        </ul>
    </div>
  )
}
