import React from 'react'
import ThemeSwitcher from '../Utils/ThemeSwitcher'
import Link from 'next/link'

export default function AdminHeader() {
  return (
    <div className=' flex items-center justify-around py-2 border-b-[1px] border-black dark:border-white fixed top-0 left-0 w-full z-50 dark:bg-opacity-70 bg-opacity-70 bg-white dark:bg-black'>
        <div className=' flex items-center gap-6'>
            <Link
            href={"/"}
            className=' font-bold text-2xl text-mountain-meadow-500'>Professor Portfolio</Link>
            <p className=' dark:text-white'>(CMS)</p>
        </div>
        <ThemeSwitcher />
    </div>
  )
}
