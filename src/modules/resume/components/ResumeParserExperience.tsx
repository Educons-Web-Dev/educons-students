import React from 'react';
import { Experience } from '../../../common/types';
import { ResumeParserExperienceBlock } from './ResumeParserExperienceBlock';

interface IResumeParserExperienceProps {
  experiences: Experience[];
}

export const ResumeParserExperience = ({ experiences }: IResumeParserExperienceProps) => {
  return (
    <div className="flex min-h-[254px] mt-8">
      <div className="w-[12px] bg-[#00232b] rounded-md min-h-[254px]" />
      <div className="ml-[30px] mt-2 max-w-[85%] md:max-w-[90%]">
        <div className="flex items-center">
          <i className="fa-solid fa-briefcase text-[35px]"></i>
          <p className="uppercase font-bold text-xl ml-4">Radno iskustvo</p>
        </div>
        <div className="mt-6">
          {experiences.map((exp) => (
            <ResumeParserExperienceBlock key={`${exp.role}-${exp.city}-${exp.company}`} experience={exp} />
          ))}
        </div>
      </div>
    </div>
  );
};
