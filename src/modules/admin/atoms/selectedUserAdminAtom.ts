import { User } from '@prisma/client';
import { atom } from 'jotai';

export const selectedUserAdminAtom = atom<User | null>(null);
