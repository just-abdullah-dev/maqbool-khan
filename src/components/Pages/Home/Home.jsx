import React from 'react'
import AboutData from './AboutData';
import Education from './Education';
import Publications from './Publications';

export default function Home({aboutData, eduData, publiData}) {
  return (
   <div className=' grid gap-4'>
    <AboutData data={aboutData} />
    <Education data={eduData} />
    <Publications data={publiData} />
   </div>
  )
}
