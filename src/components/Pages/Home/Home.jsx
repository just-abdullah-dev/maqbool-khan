import React from 'react'
import AboutData from './AboutData';
import Education from '../Education/Education';
import Publications from '../Publications/Publications';
import Projects from '../Projects/Projects';
import Experience from '../Experience/Experience';
import Skills from '../Skills/Skills';

export default function Home({aboutData, eduData, publiData, projectData, expeData, skillsData}) {
  return (
   <div className=' grid gap-4'>
    <AboutData data={aboutData} />
    <Experience data={expeData} limit={2} />
    <Education data={eduData} limit={2} />
    <Publications data={publiData} limit={2} />
    <Projects data={projectData} limit={2} />
    <Skills data={skillsData} limit={3} />
   </div>
  )
}
