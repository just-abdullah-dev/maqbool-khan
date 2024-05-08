import Error from '@/components/Utils/Error';
import Image from 'next/image';
import React from 'react'

export default function AboutData({data}) {
    console.log(data);
    if(!data?.success){
        return <Error message={data?.message} />
    }
    data = data?.data;

  return (
    <div className=' flex items-center justify-center'>
        <div className=' w-fit flex items-center flex-col gap-6 bg-gray-60 px-12 py-6 rounded-2xl'>
            <div className=' w-fit aspect-square flex items-center justify-center rounded-full border-4 border-mountain-meadow-500 overflow-hidden'>
                <Image
                src={`/uploads/${data?.avatar}`}
                width={260}
                height={260}
                alt='Profile Picture'
                className=''
                />
            </div>

            <div>
                <h1 className=' flex items-center gap-2 font-semibold text-4xl text-mountain-meadow-500'>
                {data?.name?.title && <span>{data?.name?.title}.</span>}
                {data?.name?.first && <span className=' '>{data?.name?.first}</span>}
                {data?.name?.middle && <span>{data?.name?.middle}</span>}
                {data?.name?.last && <span>{data?.name?.last}</span>}
                </h1>
            </div>
        </div>
    </div>
  )
}
