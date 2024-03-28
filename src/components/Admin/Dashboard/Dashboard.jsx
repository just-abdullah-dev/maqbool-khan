import Link from 'next/link';
import React from 'react'

export default function Dashboard({children}) {
    const options = [
        {name: "Profile", path: "dashboard/profile"},
        {name: "Profile", path: "dashboard/profile"},
        {name: "Profile", path: "dashboard/profile"},
        {name: "Profile", path: "dashboard/profile"},
        {name: "Profile", path: "dashboard/profile"},
        {name: "Profile", path: "dashboard/profile"}        
    ];

  return (
    <div className=' flex items-start'>
        <div className=' w-[20%]'>
        {options.map((opt, index)=>{
            return <Link className='block'
            href={opt?.path}
            key={index}
            >
            {opt?.name}
            </Link>
        })}
        </div>
        <div className=' w-[80%]'>
            {children}
        </div>
    </div>
  )
}
