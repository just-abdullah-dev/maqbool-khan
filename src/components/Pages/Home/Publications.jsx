import Error from '@/components/Utils/Error';
import SeeMoreBtn from '@/components/Utils/SeeMoreBtn';
import getFormatDate from '@/utils/formateDate';
import Link from 'next/link';
import React from 'react';

export default function Publications({data}) {
    if (!data?.success) {
        return <Error message={data?.message} />;
      }
      data = data?.data;
      console.log(data);
    
  return (
    <div className='p-4 lg:p-12 grid gap-4'>
        <h1 className=' text-5xl lg:text-6xl text-mountain-meadow-500 font-serif'>Publications</h1>
        <ul className='grid gap-8'>
            {data.map((item, index) => {
                if(index === 3){
                    return <li key={index} className=' w-full '>
                       <SeeMoreBtn link={"/about#publications"} />
                    </li>;
                }
                return <li key={index} className='grid gap-3 hover:bg-mountain-meadow-200 dark:hover:bg-mountain-meadow-900 dark: hover:bg-opacity-50 border border-mountain-meadow-500 cursor-pointer rounded-3xl p-4 lg:px-8 lg:py-6 transition-all duration-300'>
                    <div className=' flex items-center justify-between flex-wrap'>
                        <Link target='_blank' href={item?.link} className=' text-2xl font-semibold hover:text-mountain-meadow-500 duration-150'>{item?.title}</Link>
                        <h1 className=' font-semibold'>Published Year: {item?.year}</h1>
                    </div>
                    <div className=''>
                        <h1 className=' text-2xl font-semibold text-mountain-meadow-500'>{item?.members.length === 1 ? "Member:" : "Members:"}</h1>
                        <ul className=' px-6'>
                            {item?.members.map((ele, index)=>{
                                return <li key={index} className=''>
                                    {ele}
                                </li>
                            })}
                        </ul>
                    </div>
                </li>
            })}
        </ul>
    </div>
  )
}
