import React from 'react';
import { Experience } from '../../../common/types';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import { TipTapEditor } from '../../../components';

interface IResumeParserExperienceBlockProps {
  experience: Experience;
}

export const ResumeParserExperienceBlock = ({ experience }: IResumeParserExperienceBlockProps) => {
  const { company, role, dateStart, dateEnd, description, city, currentPosition } = experience;

  const endDate = currentPosition ? 'Trenutno na poziciji' : new Date(dateEnd).toLocaleDateString('sr-RS');

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
    ],
    content: description,
    editable: false,
  });

  return (
    <div className="mb-3">
      <h2 className="font-bold text-xl">{role}</h2>
      <h4 className="text-[20px]">{company}</h4>
      <h4 className="text-[#708BB2] italic">{city}</h4>
      <div className="text-[#708BB2]">
        <p className="italic text-sm">
          {new Date(dateStart).toLocaleDateString('sr-RS')} - {endDate}
        </p>
      </div>
      <h2 className="text-lg mt-1">Opis</h2>
      {editor && <TipTapEditor editor={editor} readonly />}
    </div>
  );
};
