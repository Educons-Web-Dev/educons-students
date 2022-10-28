import React from 'react';
import { Resume } from '../../../common/models/Resume';
import { ResumeParserSkill } from './ResumeParserSkill';

interface IResumeParserSkillsProps {
  skills: Resume['skills'];
}

export const ResumeParserSkills = ({ skills }: IResumeParserSkillsProps) => {
  return (
    <div className="flex min-h-[254px] mt-8">
      <div className="w-[12px] bg-[#708bb2] rounded-md min-h-[254px]" />
      <div className="ml-[30px] mt-2 max-w-[85%] md:max-w-[90%] lg:max-w-[95%]">
        <div className="flex items-center">
          <i className="fa-solid fa-chalkboard-user text-[35px]"></i>
          <p className="uppercase font-bold text-xl ml-4">Veštine</p>
        </div>
        <div className="mt-6">
          {skills.map((skill) => (
            <div key={skill} className="mr-2 mb-2 inline-block">
              <ResumeParserSkill skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
