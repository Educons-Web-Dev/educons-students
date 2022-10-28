import React from 'react';

interface IResumeParserSideProps {
  color: string;
}

export const ResumeParserSide = ({ color }: IResumeParserSideProps) => {
  return <div className={`w-[12px] bg-[${color}] rounded-md h-[100%]`} />;
};
