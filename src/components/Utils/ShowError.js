import React from 'react'

export default function ShowError({
    title, desc
}) {
  return (
    <div>
        <h1 className=' text-3xl text-red-600 dark:text-red-500 font-bold text-center'>{title}</h1>
        <p className=''>{desc}</p>
    </div>
  )
}
