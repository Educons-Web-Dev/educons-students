import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactModal from 'react-modal';
import { TypeOptions } from 'react-toastify';
import { Loader } from '../../components';
import { ResumeParser } from '../../modules/resume';
import { callToast } from '../../utils/toast';
import { trpc } from '../../utils/trpc';

const ProfilePage = () => {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState(false);

  const notify = (message: string, type: TypeOptions) => callToast(message, type);

  const { data, isLoading } = trpc.useQuery(['user.currentUser']);

  const { mutate: deleteResumeMutation } = trpc.useMutation('resume.delete', {
    onSuccess: () => {
      notify('Uspešno ste obrisali resume!', 'success');
      setModalOpened(false);
      router.push('/profile');
    },
    onError: () => {
      notify('Došlo je do greške prilikom brisanja resume-a', 'error');
    },
  });

  const handleDelete = () => {
    if (!data) return;

    if (!data[1]) return;

    deleteResumeMutation({ id: data[1].id });
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );

  if (!data) return <></>;

  return (
    <div className="relative">
      <ReactModal
        ariaHideApp={false}
        className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-40%]"
        isOpen={modalOpened}
        shouldCloseOnOverlayClick={true}
        style={{ overlay: { backgroundColor: 'rgba(211, 213, 215, 0.8)' } }}
        onRequestClose={() => {
          setModalOpened(false);
        }}
      >
        <div className="bg-white text-black p-10 rounded-md shadow-md">
          <h2 className="text-lg lg:text-xl">Da li ste sigurni da želite da obrišete resume?</h2>
          <div className="flex justify-start mt-3">
            <button
              onClick={handleDelete}
              className="bg-blue-500 text-white py-[6px] px-[16px] rounded-md hover:bg-blue-600 transition-colors mr-2"
            >
              Potvrdite
            </button>
            <button
              onClick={() => setModalOpened(false)}
              className="bg-white border-blue-500 border-solid border-[1px] py-[6px] px-[16px] rounded-md hover:bg-blue-500 hover:text-white transition-colors"
            >
              Odustanite
            </button>
          </div>
        </div>
      </ReactModal>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F60404"
          fillOpacity={1}
          d="M0,64L80,80C160,96,320,128,480,144C640,160,800,160,960,186.7C1120,213,1280,267,1360,293.3L1440,320L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
      <div className="w-[300px] absolute top-[50px] flex flex-col items-center lg:top-[100px] left-[50%] translate-x-[-50%]">
        <div className="avatar">
          <div className="w-24 lg:w-32 rounded-full relative">
            <Image src={data[0]?.image || ''} layout="fill" alt="Profile picture" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-bold text-2xl mt-2 mb-1">{data[0]?.name}</h1>
          <p>{data[0]?.email}</p>
        </div>
        {!data[1] && (
          <div className="mt-[60px] text-center">
            <h3 className="font-xl mb-4">Trenutno nemate kreiran resume</h3>
            <Link href="/profile/create-resume">
              <a className="bg-blue-500 text-white py-[12px] px-[30px] rounded-lg hover:bg-blue-600 transition-colors">
                Kreirajte resume
              </a>
            </Link>
          </div>
        )}
        {data[1] && (
          <div className="mt-[60px]">
            <div className="flex flex-col md:flex-row justify-center w-[200px] md:w-auto  mx-auto mb-4">
              <Link href="/profile/edit-resume">
                <a className="py-[8px] px-[30px] mb-2 md:mb-0 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-colors md:mr-2">
                  Izmenite resume
                </a>
              </Link>
              <button
                onClick={() => setModalOpened(true)}
                className="py-[8px] px-[30px] bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Obrišite resume
              </button>
            </div>
            <ResumeParser resumeContent={JSON.parse(data[1].content)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
