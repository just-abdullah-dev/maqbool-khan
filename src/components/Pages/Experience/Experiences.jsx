
import Error from '@/components/Utils/Error';
import SeeMoreBtn from '@/components/Utils/SeeMoreBtn';
import React from 'react';
import Experience from './Experience';


export default function Experiences({data, limit}) {
    if (!data?.success) {
        return <Error message={data?.message} />;
      }
      data = data?.data;
    
     limit = limit + 5;

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
                return <Experience index={index} item={item} />
            })}
        </ul>
    </div>
  )
}