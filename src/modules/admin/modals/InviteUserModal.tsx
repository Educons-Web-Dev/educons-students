import { useAtom } from 'jotai';
import React, { useCallback, useState } from 'react';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';
import { trpc } from '../../../utils/trpc';
import { validateEmail } from '../../../utils/validators';
import { adminUserModalAtom } from '../atoms';

export const InviteUserModal = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [modal, setModal] = useAtom(adminUserModalAtom);

  const handleClose = () => {
    setModal('');
    setEmail('');
    setError(false);
  };

  const notify = useCallback((message: string, type: TypeOptions) => {
    callToast(message, type);
  }, []);

  const { mutate: inviteUserMutation } = trpc.useMutation(['user.invite'], {
    onSuccess: () => {
      notify('Korisnik uspešno pozvan!', 'success');
      handleClose();
    },
    onError: () => {
      notify('Korisnik neuspešno pozvan, da li ste već pozvali ovog korisnika?', 'error');
    },
  });

  const handleSubmit = () => {
    if (email === '' || !validateEmail(email)) {
      setError(true);
      return;
    }

    setError(false);
    inviteUserMutation({ email });
  };

  return (
    <div className="bg-white text-black p-10 rounded-md shadow-md">
      <h2 className="text-xl mb-[2px]  font-bold">Pozovite novog korisnika</h2>
      <p className="mb-4 text-[14px] text-gray-400">Korisnik će dobiti email potvrdu vašeg poziva</p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="bg-white border-2 border-black input w-full max-w-xs"
      />
      {error && <p className="mt-[2px] text-red-600 text-[13px]">Email adresa nije validna</p>}
      <div className="flex justify-start mt-3">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-[6px] px-[16px] rounded-md hover:bg-blue-600 transition-colors mr-2"
        >
          Pošaljite
        </button>
        <button
          onClick={() => setModal('')}
          className="bg-white border-blue-500 border-solid border-[1px] py-[6px] px-[16px] rounded-md hover:bg-blue-500 hover:text-white transition-colors"
        >
          Odustanite
        </button>
      </div>
    </div>
  );
};
