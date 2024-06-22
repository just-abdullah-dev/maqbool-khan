import React from 'react'
import AboutData from './AboutData';
import Publications from '../Publications/Publications';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import Experiences from '../Experience/Experiences';
import Educations from '../Education/Educations';
// import Gallery from '../About/Gallery/Gallery';

export default function Home({aboutData, eduData, publiData, projectData, expeData, skillsData, countriesData}) {
  return (
   <div className=' grid gap-4'>
    <AboutData data={aboutData} />
    <Experiences data={expeData} limit={2} />
    <Educations data={eduData} limit={2} />
    <Publications data={publiData} limit={2} />
    <Projects data={projectData} limit={2} />
    <Skills data={skillsData} limit={3} />
    {/* <Gallery data={countriesData} /> */}
   </div>
  )
}
