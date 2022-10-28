import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { ResumeInput } from './ResumeInput';
import { Certificate } from '../../../common/types';
import { resumeCertificatesAtom } from '../atoms';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';

interface IResumeAddCertificateProps {
  handleCancel: () => void;
}

export const ResumeAddCertificate = ({ handleCancel }: IResumeAddCertificateProps) => {
  const [certificates, setCertificates] = useAtom(resumeCertificatesAtom);
  const [certificate, setCertificate] = useState('');
  const [date, setDate] = useState('');

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const handleSubmit = () => {
    if (certificate === '' || date === '') return;

    const isAlreadyAdded = certificates.some((cert) => cert.name === certificate && cert.date === date);

    if (isAlreadyAdded) {
      notify('Ovaj sertifikat je već unet', 'warning');
      return;
    }

    const cert: Certificate = {
      name: certificate,
      date,
    };

    setCertificates(certificates.concat(cert));
    handleCancel();
  };

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-sm border border-[#e7eaf4] bg-white w-[350px] lg:w-[550px]"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <h3>{certificate !== '' ? certificate : '(nije definisano)'}</h3>
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
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="mt-1" />
        </div>
        <div className="mt-7 ml-1 flex items-center">
          <button
            onClick={handleSubmit}
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
