"use client";
import React from 'react';

export default function error({error, reset}) {
  return (
    <div className='w-full h-fit flex flex-col gap-12 p-32 items-center'>
        <p className="text-red-500 text-3xl font-bold">{error.name}</p>
        <h1 className='font-bold text-2xl'>{error.message}</h1>
        <div className="flex justify-center items-center">
        <button 
        onClick={reset}
        className='text-lg font-black tracking-wider px-4 py-2 rounded-lg bg-green-200 text-green-600 hover:bg-opacity-95 cursor-pointer'>Try Again</button>
        </div>
    </div>
  )
}
