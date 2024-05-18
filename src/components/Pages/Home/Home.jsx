import React from 'react'
import AboutData from './AboutData';
import Education from '../Education/Education';
import Publications from '../Publications/Publications';
import Projects from '../Projects/Projects';
import Experience from '../Experience/Experience';

export default function Home({aboutData, eduData, publiData, projectData, expeData}) {
  return (
   <div className=' grid gap-4'>
    <AboutData data={aboutData} />
    <Experience data={expeData} limit={2} />
    <Education data={eduData} limit={2} />
    <Publications data={publiData} limit={2} />
    <Projects data={projectData} limit={2} />
   </div>
  )
}
