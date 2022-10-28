import { atom } from 'jotai';
import { Certificate } from '../../../common/types';

export const resumeCertificatesAtom = atom<Certificate[]>([]);
