import React from 'react';
import { Resume } from '../../../common/models/Resume';

interface IResumeParserLanguagesProps {
  languages: Resume['languages'];
}

export const ResumeParserLanguages = ({ languages }: IResumeParserLanguagesProps) => {
  return (
    <div className="flex min-h-[254px] mt-8">
      <div className="w-[12px] bg-[#00232b] rounded-md min-h-[254px]" />
      <div className="ml-[30px] mt-2">
        <div className="flex items-center">
          <i className="fa-solid fa-language text-[35px]"></i>
          <p className="uppercase font-bold text-xl ml-4">Jezici</p>
        </div>
        <div className="mt-6">
          {languages.map((lang) => (
            <div key={lang} className="mb-1">
              <h3 className="font-bold text-[18px]">{lang}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
