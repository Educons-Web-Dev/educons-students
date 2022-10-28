import React from 'react';
import { Resume as ResumeType } from '../../../common/models/Resume';
import { ResumeParserHeader } from './ResumeParserHeader';
import { ResumeParserSkills } from './ResumeParserSkills';
import { ResumeParserExperience } from './ResumeParserExperience';
import { ResumeParserEducation } from './ResumeParserEducation';
import { ResumeParserLanguages } from './ResumeParserLanguages';
import { ResumeParserCertificates } from './ResumeParserCertificates';

interface IResumeParserProps {
  resumeContent: ResumeType;
}

export const ResumeParser = ({ resumeContent }: IResumeParserProps) => {
  return (
    <div className="p-2 shadow-lg rounded-md mb-4 print:shadow-none">
      <ResumeParserHeader name={resumeContent.name} email={resumeContent.email} faculty={resumeContent.faculty} />
      <ResumeParserSkills skills={resumeContent.skills} />
      <ResumeParserExperience experiences={resumeContent.experience} />
      <ResumeParserEducation educationList={resumeContent.education} />
      <ResumeParserLanguages languages={resumeContent.languages} />
      <ResumeParserCertificates certificatesList={resumeContent.certifications} />
    </div>
  );
};
