import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';
import { resumeSkillsAtom } from '../atoms';
import { ResumeInput } from './ResumeInput';

interface IResumeAddSkillProps {
  handleCancel: () => void;
}

export const ResumeAddSkill = ({ handleCancel }: IResumeAddSkillProps) => {
  const [skills, setSkills] = useAtom(resumeSkillsAtom);
  const [skillName, setSkillName] = useState('(nije definisano)');

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const handleSubmit = () => {
    const isAlreadyAdded = skills.some((s) => s === skillName);

    if (!isAlreadyAdded) {
      setSkills(skills.concat(skillName));
      handleCancel();
      return;
    }

    notify('Ova veština je već uneta', 'warning');
  };

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-sm border border-[#e7eaf4] bg-white w-[350px] lg:w-[550px]"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3>{skillName}</h3>
      </div>
      <div className="collapse-content">
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <div className="flex flex-col">
            <label className="text-[#828ba2] text-md mb-1">Naziv veštine</label>
            <ResumeInput value={skillName} onChange={(e) => setSkillName(e.target.value)} />
          </div>
          <div className="mt-4 ml-0 lg:mt-7 lg:ml-6 flex items-center">
            <button
              onClick={handleSubmit}
              className="w-8 h-8 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-colors"
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
