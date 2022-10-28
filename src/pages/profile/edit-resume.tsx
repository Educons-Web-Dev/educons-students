import { Resume } from '@prisma/client';
import { createSSGHelpers } from '@trpc/react/ssg';
import { useAtom } from 'jotai';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TypeOptions } from 'react-toastify';
import { Resume as ResumeType } from '../../common/models/Resume';
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
import { authOptions as nextAuthOptions } from '../../pages/api/auth/[...nextauth]';
import { appRouter } from '../../server/router';
import { createContextInner } from '../../server/router/context';
import { callToast } from '../../utils/toast';
import { trpc } from '../../utils/trpc';

interface IEditResumePageProps {
  resume: Resume;
}

const EditResumePage = ({ resume }: IEditResumePageProps) => {
  const resumeContent: ResumeType = JSON.parse(resume.content);

  const router = useRouter();
  const [name, setName] = useAtom(resumeNameAtom);
  const [faculty, setFaculty] = useAtom(resumeFacultyAtom);
  const [skills, setSkills] = useAtom(resumeSkillsAtom);
  const [experiences, setExperiences] = useAtom(experiencesAtom);
  const [education, setEducation] = useAtom(resumeEducationAtom);
  const [languages, setLanguages] = useAtom(resumeLanguagesAtom);
  const [certificates, setCertificates] = useAtom(resumeCertificatesAtom);

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const { mutate: updateResumeMutation } = trpc.useMutation('resume.update', {
    onSuccess: () => {
      notify('Uspešno ste izmenili resume!', 'success');
      router.push('/profile');
    },
    onError: () => {
      notify('Došlo je do greške prilikom izmene resume-a', 'error');
    },
  });

  const handleSubmit = () => {
    const resumeData: ResumeType = {
      name,
      skills,
      experience: experiences,
      education,
      languages,
      certifications: certificates,
      email: 'studentskapraksa@educons.edu.rs',
      faculty,
    };

    updateResumeMutation({ content: JSON.stringify(resumeData), id: resume.id });
  };

  useEffect(() => {
    setName(resumeContent.name);
    setFaculty(resumeContent.faculty);
    setSkills(resumeContent.skills);
    setExperiences(resumeContent.experience);
    setEducation(resumeContent.education);
    setLanguages(resumeContent.languages);
    setCertificates(resumeContent.certifications);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-4">
      <ResumePersonalDetails />
      <ResumeSkills />
      <ResumeExperience />
      <ResumeEducation />
      <ResumeLanguages />
      <ResumeCertificates />
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition-colors"
        >
          Izmenite resume
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IEditResumePageProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, nextAuthOptions);

  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session }),
  });

  const data = await ssg.fetchQuery('user.currentUser');

  return {
    props: {
      resume: JSON.parse(JSON.stringify(data[1])),
    },
  };
};

export default EditResumePage;
