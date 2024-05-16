import Link from 'next/link'
import React from 'react'

export default function SeeMoreBtn({link}) {
  return (
    <Link href={link} className='seeMoreTag rounded-3xl w-fit mx-auto'>
    See More</Link>
  )
}
