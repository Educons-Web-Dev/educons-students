import React from 'react';

interface IResumeParserSkillProps {
  skill: string;
}

export const ResumeParserSkill = ({ skill }: IResumeParserSkillProps) => {
  return <div className="py-2 px-4 rounded-md bg-[#7f9195] text-white text-sm">{skill}</div>;
};
