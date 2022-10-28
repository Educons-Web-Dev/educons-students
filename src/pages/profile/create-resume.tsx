import { useState } from 'react';
import { useAtom } from 'jotai';
import ReactModal from 'react-modal';
import { Resume } from '../../common/models/Resume';
import {
  ResumeCertificates,
  ResumeEducation,
  ResumeExperience,
  ResumeLanguages,
  ResumePersonalDetails,
  ResumeSkills,
} from '../../modules/resume';
import {
  experiencesAtom,
  resumeCertificatesAtom,
  resumeEducationAtom,
  resumeFacultyAtom,
  resumeLanguagesAtom,
  resumeNameAtom,
  resumeSkillsAtom,
} from '../../modules/resume/atoms';
import { trpc } from '../../utils/trpc';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../utils/toast';
import { useRouter } from 'next/router';

const CreateResumePage = () => {
  const router = useRouter();
  const [name] = useAtom(resumeNameAtom);
  const [faculty] = useAtom(resumeFacultyAtom);
  const [skills] = useAtom(resumeSkillsAtom);
  const [experiences] = useAtom(experiencesAtom);
  const [education] = useAtom(resumeEducationAtom);
  const [languages] = useAtom(resumeLanguagesAtom);
  const [certificates] = useAtom(resumeCertificatesAtom);
  const [modalOpened, setModalOpened] = useState(false);

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const { mutate: createResumeMutation } = trpc.useMutation('resume.create', {
    onSuccess: () => {
      notify('Uspešno ste kreirali resume!', 'success');
      router.push('/profile');
    },
    onError: () => {
      notify('Kreiranje resume-a nije uspelo, proverite unete podatke', 'error');
    },
  });

  const handleSubmit = () => {
    const resume: Resume = {
      name: name,
      skills,
      experience: experiences,
      education,
      languages,
      certifications: certificates,
      email: 'studentskapraksa@educons.edu.rs',
      faculty,
    };

    createResumeMutation({ content: JSON.stringify(resume) });
  };

  return (
    <div className="w-[95%] lg:w-[70%] mx-auto mb-8">
      <ReactModal
        ariaHideApp={false}
        className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-40%]"
        isOpen={modalOpened}
        shouldCloseOnOverlayClick={true}
        style={{ overlay: { backgroundColor: 'rgba(211, 213, 215, 0.8)' } }}
        onRequestClose={() => {
          setModalOpened(false);
        }}
      >
        <div className="bg-white text-black p-10 rounded-md shadow-md">
          <h2 className="text-lg lg:text-xl">Da li ste sigurni da želite da sačuvate resume?</h2>
          <div className="flex justify-start mt-3">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-[6px] px-[16px] rounded-md hover:bg-blue-600 transition-colors mr-2"
            >
              Potvrdite
            </button>
            <button
              onClick={() => setModalOpened(false)}
              className="bg-white border-blue-500 border-solid border-[1px] py-[6px] px-[16px] rounded-md hover:bg-blue-500 hover:text-white transition-colors"
            >
              Odustanite
            </button>
          </div>
        </div>
      </ReactModal>
      <ResumePersonalDetails />
      <ResumeSkills />
      <ResumeExperience />
      <ResumeEducation />
      <ResumeLanguages />
      <ResumeCertificates />
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setModalOpened(true)}
          className="py-2 px-4 bg-blue-500 rounded-sm text-white hover:bg-blue-600 transition-colors"
        >
          Sačuvajte resume
        </button>
      </div>
    </div>
  );
};

export default CreateResumePage;
