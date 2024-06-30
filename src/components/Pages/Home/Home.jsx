import React from "react";
import AboutData from "./AboutData";
import Publications from "../Publications/Publications";
import Projects from "../Projects/Projects";
import Skills from "../Skills/Skills";
import Experiences from "../Experience/Experiences";
import Educations from "../Education/Educations";
import Gallery from "../About/Gallery/Gallery";
import Researchs from "../Research/Researchs";

export default function Home({
  aboutData,
  eduData,
  publiData,
  projectData,
  expeData,
  skillsData,
  countriesData,
  researchData,
}) {
  console.log(researchData);
  return (
    <div className=" grid gap-6">
      <AboutData data={aboutData} />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 overflow-hidden p-4 lg:px-12 ">
        <Experiences data={expeData} limit={3} />
        <Educations data={eduData} limit={3} />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 overflow-hidden p-4 lg:px-12 ">
        <Publications data={publiData} limit={2} />
        <Researchs data={publiData} />
      </div>
      <Projects data={projectData} limit={3} />
      <Skills data={skillsData} limit={6} />
      <Gallery data={countriesData} />
    </div>
  );
}
