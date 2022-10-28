import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { resumeLanguagesAtom } from '../atoms';
import { ResumeAddLanguage } from './ResumeAddLanguage';
import { ResumeLanguageBlock } from './ResumeLanguageBlock';
import { ResumeLanguageSuggestion } from './ResumeLanguageSuggestion';

export const ResumeLanguages = () => {
  const [languages, _setLanguages] = useAtom(resumeLanguagesAtom);
  const [isAdding, setIsAdding] = useState(false);
  const recommendedLanguages = ['Srpski', 'Engleski', 'Ruski', 'Nemački'];

  const handleCancel = () => setIsAdding(false);

  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl text-center">Jezici</h2>
      <div className="flex justify-center">
        <div className="mt-4 ml-10 lg:ml-0">
          {recommendedLanguages.map((lang) => (
            <div key={lang} className="mr-2 inline-block mb-2 lg:mb-0">
              <ResumeLanguageSuggestion language={lang} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setIsAdding(true)}
          className="text-[#1a91f0] py-2 px-4 hover:bg-[#eaf6ff] transition-colors rounded-sm"
        >
          Dodajte jezik <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex flex-col items-center mt-7">
          {languages.map((language) => (
            <div key={language} className="mb-3">
              <ResumeLanguageBlock language={language} />
            </div>
          ))}
          {isAdding && <ResumeAddLanguage handleCancel={handleCancel} />}
        </div>
      </div>
    </div>
  );
};
