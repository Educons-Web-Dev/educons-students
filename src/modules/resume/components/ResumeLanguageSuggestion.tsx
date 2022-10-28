import React from 'react';
import { useAtom } from 'jotai';
import { resumeLanguagesAtom } from '../atoms';

interface IResumeLanguageSuggestionProps {
  language: string;
}

export const ResumeLanguageSuggestion = ({ language }: IResumeLanguageSuggestionProps) => {
  const [languages, setLanguages] = useAtom(resumeLanguagesAtom);
  const isSelected = languages.some((lang) => lang === language);

  const classGen = () => {
    if (!isSelected) return 'bg-[#eff2f9] py-1 px-2 hover:bg-[#eaf6ff] hover:text-blue-500 transition-colors';

    return 'bg-blue-500 text-white py-1 px-2 cursor-auto';
  };

  const handleAddLanguage = () => {
    if (!isSelected) setLanguages(languages.concat(language));
  };

  return (
    <button onClick={handleAddLanguage} className={classGen()}>
      <span className="mr-2">{language}</span>
      {!isSelected && <i className="fa-solid fa-plus text-xs"></i>}
      {isSelected && <i className="fa-solid fa-check text-xs"></i>}
    </button>
  );
};
