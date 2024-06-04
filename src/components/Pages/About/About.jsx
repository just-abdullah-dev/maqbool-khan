
import React from 'react'
import Publications from '../Publications/Publications';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import Experiences from '../Experience/Experiences';
import Educations from '../Education/Educations';


export default function About({aboutData, eduData, publiData, projectData, expeData, skillsData}) {

  return (
        <div className=' grid gap-4'>
    <Experiences data={expeData} />
    <Educations data={eduData} />
    <Publications data={publiData} />
    <Projects data={projectData} />
    <Skills data={skillsData} />
   </div>
  )
}
