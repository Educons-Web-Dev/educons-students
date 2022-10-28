import { Certificate, Education, Experience, Faculty } from '../../common/types';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ResumeStore {
  name: string;
  faculty: Faculty;
  skills: string[];
  languages: string[];
  certifications: Certificate[];
  experience: Experience[];
  education: Education[];
}

export const useResumeStore = create<ResumeStore>()(
  devtools(
    persist((set) => ({
      name: '',
      faculty: null,
      skills: [],
      languages: [],
      certifications: [],
      experience: [],
      education: [],
    })),
  ),
);
