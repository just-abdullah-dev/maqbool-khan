"use client";
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <div className='w-full h-screen flex flex-col gap-12 py-32 items-center justify-center'>
        <p className="text-red-600 text-2xl font-bold">404 Error</p>
        <h1 className='font-bold text-5xl'>Page not found</h1>
        <div className="flex justify-center items-center">
        <button 
        onClick={()=>{
          window.location.reload();
        }}
        className='text-lg font-black tracking-wider px-4 py-2 rounded-lg bg-green-200 text-green-600 hover:bg-opacity-95 cursor-pointer'>Try Again</button>
        </div>
        <Link className=' text-sm text-dark-grey duration-200' href={'/'} >Go to Home Page -&gt;</Link>
    </div>
  )
}
