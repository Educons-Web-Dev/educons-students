import React from 'react';
import { Certificate } from '../../../common/types';

interface IResumeParserCertificatesProps {
  certificatesList: Certificate[];
}

export const ResumeParserCertificates = ({ certificatesList }: IResumeParserCertificatesProps) => {
  return (
    <div className="flex min-h-[254px] mt-8">
      <div className="w-[12px] bg-[#708bb2] rounded-md min-h-[254px]" />
      <div className="ml-[30px] mt-2 max-w-[80%] md:max-w-[95%]">
        <div className="flex items-center">
          <i className="fa-solid fa-certificate text-[35px]"></i>
          <p className="uppercase font-bold text-xl ml-4">Sertifikati</p>
        </div>
        <div className="mt-6">
          {certificatesList.map((cert) => (
            <div key={`${cert.name}-${cert.date}`} className="mb-1 flex items-center">
              <h3 className="font-bold text-[16px] mr-2">{cert.name}</h3>
              <span className="italic text-[#708bb2]">{new Date(cert.date).toLocaleDateString('sr-RS')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
