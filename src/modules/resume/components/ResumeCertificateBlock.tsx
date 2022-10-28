import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { TypeOptions } from 'react-toastify';
import { Certificate } from '../../../common/types';
import { callToast } from '../../../utils/toast';
import { resumeCertificatesAtom } from '../atoms';
import { ResumeInput } from './ResumeInput';

interface IResumeCertificateBlockProps {
  cert: Certificate;
}

export const ResumeCertificateBlock = ({ cert }: IResumeCertificateBlockProps) => {
  const { name, date } = cert;

  const [certificates, setCertificates] = useAtom(resumeCertificatesAtom);
  const [certificate, setCertificate] = useState(name);
  const [certDate, setCertDate] = useState(date);

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const handleEdit = () => {
    if (certificate === '' || certDate === '') return;

    const isAlreadyAdded = certificates.some((cert) => cert.name === certificate && cert.date === date);

    if (isAlreadyAdded) {
      notify('Ovaj sertifikat je već unet', 'warning');
      return;
    }

    const editedCert: Certificate = {
      name: certificate,
      date: certDate,
    };

    setCertificates(certificates.map((c) => (c.name === name && c.date === date ? editedCert : c)));
  };

  const handleDelete = () => setCertificates(certificates.filter((cert) => cert.name !== name && cert.date !== date));

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-sm border border-[#e7eaf4] bg-white w-[350px] lg:w-[550px]"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3>{name}</h3>
      </div>
      <div className="collapse-content">
        <div className="">
          <div className="flex flex-col">
            <label className="text-[#828ba2] text-md mb-1">Sertifikat</label>
            <ResumeInput value={certificate} onChange={(e) => setCertificate(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col mt-3 ml-[2px] w-[120px]">
          <label className="text-[#828ba2] text-md mb-1">Datum</label>
          <input value={certDate} onChange={(e) => setCertDate(e.target.value)} type="date" className="mt-1" />
        </div>
        <div className="mt-7 ml-1 flex items-center">
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
