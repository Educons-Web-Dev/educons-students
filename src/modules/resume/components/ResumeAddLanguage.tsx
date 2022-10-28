import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { resumeLanguagesAtom } from '../atoms';
import { ResumeInput } from './ResumeInput';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';

interface IResumeAddLanguageProps {
  handleCancel: () => void;
}

export const ResumeAddLanguage = ({ handleCancel }: IResumeAddLanguageProps) => {
  const [languages, setLanguages] = useAtom(resumeLanguagesAtom);
  const [language, setLanguage] = useState('');

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const handleSubmit = () => {
    const alreadyAdded = languages.some((lang) => lang === language);

    if (alreadyAdded) {
      notify('Ovaj jezik je već unet', 'warning');
      return;
    }

    setLanguages(languages.concat(language));
    handleCancel();
  };

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-sm border border-[#e7eaf4] bg-white w-[350px] lg:w-[550px]"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3>{language !== '' ? language : '(nije definisano)'}</h3>
      </div>
      <div className="collapse-content">
        <div className="flex items-start lg:items-center flex-col lg:flex-row">
          <div className="flex flex-col">
            <label className="text-[#828ba2] text-md mb-1">Jezik</label>
            <ResumeInput value={language} onChange={(e) => setLanguage(e.target.value)} />
          </div>
          <div className="mt-4 ml-0 lg:mt-7 lg:ml-6 flex items-center">
            <button
              onClick={handleSubmit}
              disabled={language === ''}
              className="w-8 h-8 disabled:hover:bg-blue-500 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              onClick={handleCancel}
              className="w-8 h-8 rounded-full ml-2 text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
