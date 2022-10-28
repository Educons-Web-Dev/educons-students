import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { resumeEducationAtom } from '../atoms';
import { ResumeAddEducation } from './ResumeAddEducation';
import { ResumeEducationBlock } from './ResumeEducationBlock';

export const ResumeEducation = () => {
  const [educations, _setEducations] = useAtom(resumeEducationAtom);
  const [isAdding, setIsAdding] = useState(false);

  const handleCancel = () => setIsAdding(false);

  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl text-center">Edukacija</h2>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setIsAdding(true)}
          className="text-[#1a91f0] py-2 px-4 hover:bg-[#eaf6ff] transition-colors rounded-sm"
        >
          Dodajte obrazovanje <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex flex-col items-center mt-7">
          {educations.map((education) => (
            <div key={education.school} className="mb-3">
              <ResumeEducationBlock education={education} />
            </div>
          ))}
          {isAdding && <ResumeAddEducation handleCancel={handleCancel} />}
        </div>
      </div>
    </div>
  );
};
