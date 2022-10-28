import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { experiencesAtom } from '../atoms';
import { ResumeAddExperience } from './ResumeAddExperience';
import { ResumeExperienceBar } from './ResumeExperienceBar';

export const ResumeExperience = () => {
  const [experiences, _setExperiences] = useAtom(experiencesAtom);
  const [isAdding, setIsAdding] = useState(false);

  const handleCancel = () => setIsAdding(false);

  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl text-center">Radno iskustvo</h2>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setIsAdding(true)}
          className="text-[#1a91f0] py-2 px-4 hover:bg-[#eaf6ff] transition-colors rounded-sm"
        >
          Dodajte iskustvo <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex flex-col items-center mt-7">
          {experiences.map((exp) => (
            <div key={exp.company} className="mb-3">
              <ResumeExperienceBar experience={exp} />
            </div>
          ))}
          {isAdding && <ResumeAddExperience handleCancel={handleCancel} />}
        </div>
      </div>
    </div>
  );
};
