"use client";
import React from 'react';

export default function Error({message}) {
  return (
    <div className='w-full h-fit flex flex-col gap-12 p-32 items-center'>
        <p className="text-red-500 text-3xl font-bold">Error</p>
        <h1 className='font-bold text-2xl'>{message}</h1>
    
    </div>
  )
}
