import React from 'react';
import { Education } from '../../../common/types';
import { ResumeParserEducationBlock } from './ResumeParserEducationBlock';

interface IResumeParserEducationProps {
  educationList: Education[];
}

export const ResumeParserEducation = ({ educationList }: IResumeParserEducationProps) => {
  return (
    <div className="flex min-h-[254px] mt-8">
      <div className="w-[12px] bg-[#708bb2] rounded-md min-h-[254px]" />
      <div className="ml-[30px] mt-2">
        <div className="flex items-center">
          <i className="fa-solid fa-graduation-cap text-[35px]"></i>
          <p className="uppercase font-bold text-xl ml-4">Edukacija</p>
        </div>
        <div className="mt-6">
          {educationList.map((edu) => (
            <div className="mb-4" key={`${edu.city}-${edu.school}`}>
              <ResumeParserEducationBlock education={educationList[0]!} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
