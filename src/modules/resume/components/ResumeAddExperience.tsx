import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import { ResumeInput } from './ResumeInput';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TipTapEditor } from '../../../components';
import ResumeEditorMenu from './ResumeEditorMenu';
import { useAtom } from 'jotai';
import { experiencesAtom } from '../atoms';
import { Experience } from '../../../common/types';
import { CharactersCount } from '../../../components/TipTapEditor/CharactersCount';
import CharacterCount from '@tiptap/extension-character-count';

interface IResumeAddExperienceProps {
  handleCancel: () => void;
}

export const ResumeAddExperience = ({ handleCancel }: IResumeAddExperienceProps) => {
  const [experiences, setExperiences] = useAtom(experiencesAtom);
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [checked, setChecked] = useState(false);

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
    content: '<p>Sadržaj...</p>',
  });

  const onSubmit = () => {
    const description = editor?.getHTML();

    if (description) {
      const exp: Experience = {
        role: position,
        company,
        dateStart: dateFrom,
        dateEnd: dateTo,
        description,
        city,
        currentPosition: checked,
      };

      setExperiences(experiences.concat(exp));
      handleCancel();
    }
  };

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-sm border border-[#e7eaf4] bg-white w-[350px] lg:w-[650px]"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3>{position !== '' ? position : '(nije definisano)'}</h3>
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
        <div className="flex items-center flex-col lg:flex-row justify-center">
          <div className="flex flex-col">
            <label className="text-[#828ba2] text-md mb-1">Pozicija</label>
            <ResumeInput value={position} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <div className="mx-2" />
          <div className="flex flex-col mt-2 lg:mt-0">
            <label className="text-[#828ba2] text-md mb-1">Kompanija</label>
            <ResumeInput value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center flex-col lg:flex-row justify-center mt-4">
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
            <ResumeInput value={city} onChange={(e) => setCity(e.target.value)} />
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
            onClick={onSubmit}
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
