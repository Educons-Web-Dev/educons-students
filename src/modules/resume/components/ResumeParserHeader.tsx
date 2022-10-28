import React from 'react';
import { Faculty } from '../../../common/types';

interface IResumeParserHeaderProps {
  name: string;
  email: string;
  faculty: Faculty;
}

export const ResumeParserHeader = ({ name, email, faculty }: IResumeParserHeaderProps) => {
  return (
    <div className="flex items-center h-[254px]">
      <div className="w-[12px] bg-[#00232b] rounded-md h-[100%]" />
      <div className="bg-[#ebebeb] h-[100%] ml-[10px] p-4 w-[320px] md:w-[600px] lg:w-[800px] print:w-[100%] rounded-md">
        <h2 className="text-[35px] lg:text-[40px] text-center mt-5">{name}</h2>
        <h3 className="text-center text-[20px] -mt-2 text-gray-500">{faculty}</h3>
        <h3 className="text-center mt-2 text-sm text-gray-500">{email}</h3>
      </div>
    </div>
  );
};
