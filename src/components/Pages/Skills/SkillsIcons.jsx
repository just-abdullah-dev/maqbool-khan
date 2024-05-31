import React from 'react';
import Icon from '@mdi/react';
import {
    mdiLanguageHtml5,
    mdiLanguageCss3,
    mdiLanguageJavascript,
    mdiReact,
    mdiAngular,
    mdiDocker,
    mdiLanguagePython,
    mdiWordpress,
    mdiLinux,
    mdiGit,
    mdiNpm,
    mdiDatabase
  } from '@mdi/js';
import SkillIcon from './SkillIcon';

export default function SkillsIcons() {
    const skillsData = [
        { title: "HTML5", jsx: <Icon path={mdiLanguageHtml5} size={2.5} /> },
        { title: "CSS3", jsx: <Icon path={mdiLanguageCss3} size={2.5} /> },
        { title: "JavaScript", jsx: <Icon path={mdiLanguageJavascript} size={2.5} /> },
        { title: "React", jsx: <Icon path={mdiReact} size={2.5} /> },
        { title: "Angular", jsx: <Icon path={mdiAngular} size={2.5} /> },
        { title: "Docker", jsx: <Icon path={mdiDocker} size={2.5} /> },
        { title: "Python", jsx: <Icon path={mdiLanguagePython} size={2.5} /> },
        { title: "WordPress", jsx: <Icon path={mdiWordpress} size={2.5} /> },
        { title: "Linux", jsx: <Icon path={mdiLinux} size={2.5} /> },
        { title: "Git", jsx: <Icon path={mdiGit} size={2.5} /> },
        { title: "npm", jsx: <Icon path={mdiNpm} size={2.5} /> },
        { title: "MySQL", jsx: <Icon path={mdiDatabase} size={2.5} /> }
      ];
  return <ul className=' grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid gap-6 md:px-8'>
  {skillsData && skillsData.map((item, index)=>{
    return (<SkillIcon key={index} item={item} />
    )
  })}
  </ul>
   
}
