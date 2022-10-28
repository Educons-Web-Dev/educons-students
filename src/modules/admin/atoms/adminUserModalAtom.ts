import { atom } from 'jotai';

export type AdminUserModals = '' | 'invite_user' | 'promote_user' | 'delete_user' | 'demote_user';

export const adminUserModalAtom = atom<AdminUserModals>('');
