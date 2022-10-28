import React, { useState } from 'react';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../utils/toast';
import { trpc } from '../utils/trpc';
import { validateEmail } from '../utils/validators';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const { mutate: subscribeMutation } = trpc.useMutation('newsletter.subscribe');

  const handleSubscribe = () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      notify('Email adresa mora biti validna', 'error');
      return;
    }

    subscribeMutation({ email });
    notify('Hvala Vam na pretplati!', 'success');
    setEmail('');
  };

  return (
    <div className="p-5 rounded-md shadow-lg w-[340px] md:w-[700px]">
      <h1 className="font-bold text-xl">Ne propusti novosti 👇</h1>
      <div className="flex flex-col md:flex-row items-start md:items-center mt-6">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 mr-3 border-slate rounded-2xl py-2 px-4 w-[300px] md:w-[350px] focus:border-black transition-colors"
          placeholder="Email"
        />
        <button
          onClick={handleSubscribe}
          className="bg-[#f51767] text-white mt-2 md:mt-0 rounded-2xl py-2 px-6 hover:bg-[#d00951]"
        >
          Pretplati se
        </button>
      </div>
      <p className="text-[#636363] text-[12px] mt-4 md:mt-1 ml-1">Pridruži se kolegama. Otkaži pretplatu bilo kada.</p>
    </div>
  );
};
