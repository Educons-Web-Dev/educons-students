import { useAtom } from 'jotai';
import React from 'react';
import { resumeSkillsAtom } from '../atoms';

interface IResumeSkillRecommendation {
  skillName: string;
}

const ResumeSkillRecommendation = ({ skillName }: IResumeSkillRecommendation) => {
  const [skills, setSkills] = useAtom(resumeSkillsAtom);
  const isSelected = skills.some((s) => s === skillName);

  const classGen = () => {
    if (!isSelected) return 'bg-[#eff2f9] py-1 px-2 hover:bg-[#eaf6ff] hover:text-blue-500 transition-colors';

    return 'bg-blue-500 text-white py-1 px-2 cursor-auto';
  };

  const handleAddSkill = () => {
    if (!isSelected) setSkills(skills.concat(skillName));
  };

  return (
    <button className={classGen()} onClick={handleAddSkill}>
      <span className="mr-2">{skillName}</span>
      {!isSelected && <i className="fa-solid fa-plus text-xs"></i>}
      {isSelected && <i className="fa-solid fa-check text-xs"></i>}
    </button>
  );
};

export default ResumeSkillRecommendation;
