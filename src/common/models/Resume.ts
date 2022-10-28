import { Certificate, Education, Experience, Faculty } from '../types';

export type Resume = {
  name: string;
  email: string;
  faculty: Faculty;
  skills: string[];
  languages: string[];
  certifications: Certificate[];
  experience: Experience[];
  education: Education[];
};
