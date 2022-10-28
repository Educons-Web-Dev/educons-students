import React from 'react';
import { Education } from '../../../common/types';

interface IResumeParserEducationBlockProps {
  education: Education;
}

export const ResumeParserEducationBlock = ({ education }: IResumeParserEducationBlockProps) => {
  const { school, dateFrom, dateEnd, city } = education;

  return (
    <div>
      <h2 className="font-bold text-lg">{school}</h2>
      <h3>{city}</h3>
      <p className="italic text-[#708BB2]">
        {new Date(dateFrom).toLocaleDateString('sr-RS')} - {new Date(dateEnd).toLocaleDateString('sr-RS')}
      </p>
    </div>
  );
};
