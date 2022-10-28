import React from 'react';
import { Resume, User } from '@prisma/client';
import Image from 'next/image';
import { Resume as ResumeType } from '../../../common/models/Resume';
import { useRouter } from 'next/router';

interface IStudentCardProps {
  student: User;
  resume: Resume;
}

export const StudentCard = ({ student, resume }: IStudentCardProps) => {
  const resumeContent: ResumeType = JSON.parse(resume.content);
  const router = useRouter();

  const handleClick = () => router.push(`/students/${student.id}`);

  return (
    <div className="shadow-md p-4 rounded-md">
      <div className="flex items-center">
        <div className="avatar">
          <div className="w-20 rounded-full relative">
            <Image layout="fill" src={student.image || ''} alt={student.name || ''} />
          </div>
        </div>
        <div className="ml-5">
          <h3 className="font-bold text-xl">{student.name}</h3>
          <p>{resumeContent.faculty}</p>
        </div>
      </div>
      <div className="w-[100%] h-[1px] bg-black my-6" />
      <button onClick={handleClick} className="py-2 w-[100%] hover:bg-[#0000000a] uppercase transition-colors">
        Resume
      </button>
    </div>
  );
};
