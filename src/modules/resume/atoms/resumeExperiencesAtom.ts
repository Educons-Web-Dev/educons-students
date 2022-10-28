import { atom } from 'jotai';
import { Experience } from '../../../common/types';

export const experiencesAtom = atom<Experience[]>([]);
