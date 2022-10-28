import { useRouter } from 'next/router';
import React from 'react';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../utils/toast';
import { trpc } from '../../utils/trpc';

const NewsletterUnsubscribePage = () => {
  const router = useRouter();

  const query = router.query as { token: string; email: string };
  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const { mutate: newsletterUnsubscribeMutation } = trpc.useMutation('newsletter.unsubscribe', {
    onSuccess: () => {
      notify('Pretplata uspešno otkazana!', 'success');
      router.push('/');
    },
    onError: () => {
      notify('Pretplata neuspešno otkazana', 'error');
    },
  });

  return (
    <div className="flex justify-center mt-[60px]">
      <button
        onClick={() => newsletterUnsubscribeMutation({ email: query.email, token: query.token })}
        className="py-2 px-4 bg-blue-500 rounded-sm text-white hover:bg-blue-600 transition:colors"
      >
        Otkaži pretplatu
      </button>
    </div>
  );
};

export default NewsletterUnsubscribePage;
