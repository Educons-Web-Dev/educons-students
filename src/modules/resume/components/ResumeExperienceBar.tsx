import React, { useState } from 'react';
import { Experience } from '../../../common/types';
import { TipTapEditor } from '../../../components';
import { ResumeInput } from './ResumeInput';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import ResumeEditorMenu from './ResumeEditorMenu';
import { useAtom } from 'jotai';
import { experiencesAtom } from '../atoms';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';
import CharacterCount from '@tiptap/extension-character-count';
import { CharactersCount } from '../../../components/TipTapEditor/CharactersCount';

interface IResumeExperienceBarProps {
  experience: Experience;
}

export const ResumeExperienceBar = ({ experience }: IResumeExperienceBarProps) => {
  const { role, company, city, currentPosition, dateStart, dateEnd, description } = experience;
  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const [experiences, setExperiences] = useAtom(experiencesAtom);
  const [position, setPosition] = useState(role);
  const [employer, setEmployer] = useState(company);
  const [location, setLocation] = useState(city);
  const [checked, setChecked] = useState(currentPosition);
  const [dateFrom, setDateFrom] = useState(dateStart);
  const [dateTo, setDateTo] = useState(dateEnd);

  const limit = 2000;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: { depth: 10 },
        bulletList: {
          itemTypeName: 'listItem',
          HTMLAttributes: {
            class: 'pl-[40px] list-disc',
          },
        },
      }),
      Underline,
      CharacterCount.configure({
        limit,
      }),
    ],
    content: description,
  });

  const handleDelete = () => setExperiences(experiences.filter((exp) => exp.company !== company && exp.role !== role));

  const handleEdit = () => {
    const description = editor?.getHTML();

    if (description) {
      const editedExperience: Experience = {
        role: position,
        company: employer,
        city: location,
        currentPosition: checked,
        dateStart: dateFrom,
        dateEnd: dateTo,
        description,
      };

      setExperiences(experiences.map((exp) => (exp.company === company && exp.role === role ? editedExperience : exp)));
      notify('Uspešno ste izmenili iskustvo', 'success');
    }
  };

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-sm border border-[#e7eaf4] bg-white w-[340px] lg:w-[650px]"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3>{role}</h3>
      </div>
      <div className="collapse-content">
        <div className="flex justify-end mb-2">
          <label className="label cursor-pointer">
            <span className="label-text mr-3 text-[#828ba2]">Trenutno radim na poziciji</span>
            <input
              type="checkbox"
              className="toggle"
              checked={checked}
              onChange={() => setChecked((currState) => !currState)}
            />
          </label>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="flex flex-col">
            <label className="text-[#828ba2] text-md mb-1">Pozicija</label>
            <ResumeInput value={position} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <div className="mx-2" />
          <div className="flex flex-col mt-2 lg:mt-0">
            <label className="text-[#828ba2] text-md mb-1">Kompanija</label>
            <ResumeInput value={employer} onChange={(e) => setEmployer(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center mt-4">
          <div className="flex justify-center">
            <div className="flex flex-col mr-4">
              <label className="text-[#828ba2] text-md mb-1">Datum od</label>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <label className="text-[#828ba2] text-md mb-1">Datum do</label>
              <input type="date" disabled={checked} value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
          </div>
          <div className="mx-4" />
          <div className="flex flex-col mt-2 lg:mt-0">
            <label className="text-[#828ba2] text-md mb-1">Grad</label>
            <ResumeInput value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-[#828ba2] text-md mb-1">Opis</label>
          {editor && (
            <>
              <TipTapEditor editor={editor} menu={<ResumeEditorMenu editor={editor} />} />
              <div className="mt-2">
                <CharactersCount charCount={editor?.storage.characterCount.characters()} limit={limit} />
              </div>
            </>
          )}
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
