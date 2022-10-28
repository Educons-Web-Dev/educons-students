import { useAtom } from 'jotai';
import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';
import { trpc } from '../../../utils/trpc';
import { adminUserModalAtom, selectedUserAdminAtom } from '../atoms';

export const DeleteUserModal = () => {
  const queryClient = useQueryClient();
  const [_modal, setModal] = useAtom(adminUserModalAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAdminAtom);
  const notify = useCallback((message: string, type: TypeOptions) => {
    callToast(message, type);
  }, []);

  const handleClose = () => {
    setModal('');
    setSelectedUser(null);
  };

  const { mutate: deleteUserMutation } = trpc.useMutation('user.delete', {
    onSuccess: () => {
      notify('Korisnik uspešno obrisan!', 'success');
      handleClose();
      queryClient.invalidateQueries('user.all');
      queryClient.invalidateQueries('user.getAdmins');
    },
    onError: () => {
      notify('Nemate privilegije za ovu radnju', 'error');
      handleClose();
    },
  });

  const handleDeleteUser = () => {
    if (selectedUser?.email) deleteUserMutation({ email: selectedUser?.email });
  };

  return (
    <div className="bg-white text-black p-10 rounded-md shadow-md">
      <h2 className="text-lg lg:text-xl mb-[2px]">
        Da li ste sigurni da želite da uklonite korisnika <span className="font-bold">{selectedUser?.name}</span>?
      </h2>
      <div className="flex justify-start mt-3">
        <button
          onClick={handleDeleteUser}
          className="bg-blue-500 text-white py-[6px] px-[16px] rounded-md hover:bg-blue-600 transition-colors mr-2"
        >
          Potvrdite
        </button>
        <button
          onClick={handleClose}
          className="bg-white border-blue-500 border-solid border-[1px] py-[6px] px-[16px] rounded-md hover:bg-blue-500 hover:text-white transition-colors"
        >
          Odustanite
        </button>
      </div>
    </div>
  );
};
