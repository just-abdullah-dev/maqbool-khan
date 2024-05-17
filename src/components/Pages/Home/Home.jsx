import React from 'react'
import AboutData from './AboutData';
import Education from '../Education/Education';
import Publications from '../Publications/Publications';
import Projects from '../Projects/Projects';

export default function Home({aboutData, eduData, publiData, projectData}) {
  return (
   <div className=' grid gap-4'>
    <AboutData data={aboutData} />
    <Education data={eduData} limit={2} />
    <Publications data={publiData} limit={3} />
    <Projects data={projectData} limit={3} />
   </div>
  )
}
