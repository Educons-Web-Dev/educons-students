import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { resumeSkillsAtom } from '../atoms';
import { ResumeAddSkill } from './ResumeAddSkill';
import { ResumeSkillBar } from './ResumeSkillBar';
import ResumeSkillRecommendation from './ResumeSkillRecommendation';

export const ResumeSkills = () => {
  const [skills] = useAtom(resumeSkillsAtom);
  const [isAdding, setIsAdding] = useState(false);

  const recommendedSkills: string[] = ['Organizacija tima', 'Rad pod pritiskom', 'Komunikacija'];

  const handleCancel = () => setIsAdding(false);

  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl text-center">Veštine</h2>
      <div className="flex justify-center">
        <div className="mt-4 ml-3 lg:ml-0">
          {recommendedSkills.map((skillName) => (
            <div key={skillName} className="mr-2 inline-block mb-2 lg:mb-0">
              <ResumeSkillRecommendation skillName={skillName} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setIsAdding(true)}
          className="text-[#1a91f0] py-2 px-4 hover:bg-[#eaf6ff] transition-colors rounded-sm"
        >
          Dodajte veštinu <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>
      <div className="flex flex-col items-center mt-7">
        {skills.map((skill) => (
          <div className="mb-3" key={skill}>
            <ResumeSkillBar skill={skill} />
          </div>
        ))}
        {isAdding && <ResumeAddSkill handleCancel={handleCancel} />}
      </div>
    </div>
  );
};
