import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';
import { resumeSkillsAtom } from '../atoms';
import { ResumeInput } from './ResumeInput';

interface IResumeSkillBar {
  skill: string;
}

export const ResumeSkillBar = ({ skill }: IResumeSkillBar) => {
  const [skills, setSkills] = useAtom(resumeSkillsAtom);
  const [skillName, setSkillName] = useState(skill);

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const handleDelete = () => setSkills(skills.filter((s) => s !== skill));

  const handleEdit = () => {
    const isAlreadyAdded = skills.some((s) => s === skillName);

    if (!isAlreadyAdded) {
      setSkills(skills.map((s) => (s === skill ? skillName : s)));
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
        <h3>{skill}</h3>
      </div>
      <div className="collapse-content">
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <div className="flex flex-col">
            <label className="text-[#828ba2] text-md mb-1">Naziv veštine</label>
            <ResumeInput value={skillName} onChange={(e) => setSkillName(e.target.value)} />
          </div>
          <div className="mt-4 lg:mt-7 lg:ml-6 flex items-center">
            <button
              onClick={handleEdit}
              className="w-8 h-8 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
            <button
              onClick={handleDelete}
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
