import React, { ChangeEvent, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { resumeFacultyAtom, resumeNameAtom } from '../atoms';
import { ResumeInput } from './ResumeInput';
import { Faculty } from '../../../common/types';

export const ResumePersonalDetails = () => {
  const { data } = useSession();

  const [name, setName] = useAtom(resumeNameAtom);
  const [faculty, setFaculty] = useAtom(resumeFacultyAtom);

  const faculties = [
    'Informacione tehnologije',
    'Digitalna produkcija',
    'Zaštita životne sredine',
    'Ekološka poljoprivreda',
    'Učiteljski fakultet',
    'Primenjena bezbednost',
    'Poslovna ekonomija',
  ];

  useEffect(() => {
    if (data?.user?.name) setName(data?.user?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl text-center">Lični detalji</h2>
      <div className="flex flex-col items-center mt-6 justify-center">
        <div className="flex flex-col mb-3">
          <label className="text-[#828ba2] text-md mb-1">Ime</label>
          <ResumeInput value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        </div>
        <div className="mx-2" />
        <div className="flex flex-col mb-3">
          <label className="text-[#828ba2] text-md mb-1">Fakultet</label>
          <select
            className="select max-w-xs font-normal bg-[#eff2f9] w-[300px] rounded-sm"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFaculty(e.target.value as Faculty)}
            value={faculty as string}
          >
            {faculties.map((faculty) => (
              <option key={faculty}>{faculty}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
