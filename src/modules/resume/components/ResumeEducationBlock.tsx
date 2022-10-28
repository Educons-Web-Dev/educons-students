import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Education } from '../../../common/types';
import { resumeEducationAtom } from '../atoms';
import { ResumeInput } from './ResumeInput';

interface IResumeEducationBlockProps {
  education: Education;
}

export const ResumeEducationBlock = ({ education }: IResumeEducationBlockProps) => {
  const { city, school, dateFrom, dateEnd } = education;

  const [educations, setEducations] = useAtom(resumeEducationAtom);
  const [schoolName, setSchoolName] = useState(school);
  const [location, setLocation] = useState(city);
  const [dateStart, setDateStart] = useState(dateFrom);
  const [dateTo, setDateTo] = useState(dateEnd);

  const handleDelete = () => {
    setEducations(educations.filter((education) => education.city !== city && education.school !== school));
  };

  const handleEdit = () => {
    const edu: Education = {
      city: location,
      school: schoolName,
      dateFrom: dateStart,
      dateEnd: dateTo,
    };

    setEducations(
      educations.map((education) => (education.city === city && education.school === school ? edu : education)),
    );
  };

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-sm border border-[#e7eaf4] bg-white w-[350px] lg:w-[650px]"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3>{school}</h3>
      </div>
      <div className="collapse-content">
        <div className="flex items-center justify-center flex-col lg:flex-row">
          <div className="flex flex-col">
            <label className="text-[#828ba2] text-md mb-1">Škola</label>
            <ResumeInput value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
          </div>
          <div className="mx-2" />
          <div className="flex flex-col mt-2 lg:mt-0">
            <label className="text-[#828ba2] text-md mb-1">Grad</label>
            <ResumeInput value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center justify-start mt-4 ml-2 lg:ml-0">
          <div className="flex justify-center">
            <div className="flex flex-col mr-4">
              <label className="text-[#828ba2] text-md mb-1">Datum od</label>
              <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
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
  );
};
