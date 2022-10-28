import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Education } from '../../../common/types';
import { resumeEducationAtom } from '../atoms';
import { ResumeInput } from './ResumeInput';

interface IResumeAddEducationProps {
  handleCancel: () => void;
}

export const ResumeAddEducation = ({ handleCancel }: IResumeAddEducationProps) => {
  const [education, setEducation] = useAtom(resumeEducationAtom);
  const [school, setSchool] = useState('');
  const [city, setCity] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleSubmit = () => {
    const newEducation: Education = {
      city,
      school,
      dateFrom,
      dateEnd: dateTo,
    };

    setEducation(education.concat(newEducation));
    handleCancel();
  };

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-sm border border-[#e7eaf4] bg-white w-[350px] lg:w-[650px]"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3>{school !== '' ? school : '(nije definisano)'}</h3>
      </div>
      <div className="collapse-content">
        <div className="flex items-center justify-center flex-col lg:flex-row">
          <div className="flex flex-col">
            <label className="text-[#828ba2] text-md mb-1">Škola</label>
            <ResumeInput value={school} onChange={(e) => setSchool(e.target.value)} />
          </div>
          <div className="mx-2" />
          <div className="flex flex-col mt-2 lg:mt-0">
            <label className="text-[#828ba2] text-md mb-1">Grad</label>
            <ResumeInput value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center justify-start mt-4 ml-2 lg:ml-0">
          <div className="flex justify-center">
            <div className="flex flex-col mr-4">
              <label className="text-[#828ba2] text-md mb-1">Datum od</label>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="text-[#828ba2] text-md mb-1">Datum do</label>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
          </div>
          <div className="mx-4" />
        </div>
        <div className="mt-5 flex items-center">
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
  );
};
