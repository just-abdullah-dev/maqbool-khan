import React from 'react'
import AboutData from './AboutData'

export default function Home({aboutData}) {
  return (
   <div>
    <AboutData data={aboutData} />
   </div>
  )
}
