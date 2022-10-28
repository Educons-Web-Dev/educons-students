import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { resumeCertificatesAtom } from '../atoms';
import { ResumeAddCertificate } from './ResumeAddCertificate';
import { ResumeCertificateBlock } from './ResumeCertificateBlock';

export const ResumeCertificates = () => {
  const [certificates, _setCertificates] = useAtom(resumeCertificatesAtom);
  const [isAdding, setIsAdding] = useState(false);

  const handleCancel = () => setIsAdding(false);

  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl text-center">Sertifikati</h2>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setIsAdding(true)}
          className="text-[#1a91f0] py-2 px-4 hover:bg-[#eaf6ff] transition-colors rounded-sm"
        >
          Dodajte sertifikat <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex flex-col items-center mt-7">
          {certificates.map((cert) => (
            <div key={cert.name} className="mb-3">
              <ResumeCertificateBlock cert={cert} />
            </div>
          ))}
          {isAdding && <ResumeAddCertificate handleCancel={handleCancel} />}
        </div>
      </div>
    </div>
  );
};
