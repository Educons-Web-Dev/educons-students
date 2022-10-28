import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader, Pagination } from '../../../components';
import ReactModal from 'react-modal';
import AdminLayout from '../../../layouts/AdminLayout';
import { trpc } from '../../../utils/trpc';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { News } from '@prisma/client';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';
import { useQueryClient } from 'react-query';

const AdminNewsPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const size = 10;
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<News | null>(null);

  const notify = useCallback((message: string, type: TypeOptions) => {
    callToast(message, type);
  }, []);

  const { data, isLoading } = trpc.useQuery(['news.getAll', { page, size, title }]);
  const { mutate: deleteNewsByIdMutation } = trpc.useMutation('news.deleteById', {
    onSuccess: () => {
      notify('Novost uspešno obrisana!', 'success');
      setOpenModal(false);
      queryClient.invalidateQueries('news.getAll');
    },
    onError: () => {
      notify('Novost neuspešno obrisana', 'error');
      setOpenModal(false);
    },
  });

  const handleEditNews = (newsId: string) => {
    router.push(`/admin/news/${newsId}`);
  };

  const debouncedSearch = debounce((value: string) => {
    setTitle(value);
    setPage(1);
  }, 500);

  const handleDeleteNews = (newsId: string) => deleteNewsByIdMutation({ id: newsId });

  return (
    <AdminLayout>
      <ReactModal
        ariaHideApp={false}
        className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-40%]"
        isOpen={openModal}
        shouldCloseOnOverlayClick={true}
        style={{ overlay: { backgroundColor: 'rgba(211, 213, 215, 0.8)' } }}
        onRequestClose={() => {
          setOpenModal(false);
        }}
      >
        <div className="bg-white text-black p-10 rounded-md shadow-md">
          <h2 className="text-xl mb-6">
            Da li želite da obrišete novost <span className="font-bold">{newsToDelete?.title}</span>?
          </h2>
          <div className="flex">
            <button
              onClick={() => handleDeleteNews(newsToDelete!.id!)}
              className="bg-blue-500 text-white py-[6px] px-[16px] rounded-md hover:bg-blue-600 transition-colors mr-2"
            >
              Potvrdite
            </button>
            <button
              onClick={() => {
                setOpenModal(false);
                setNewsToDelete(null);
              }}
              className="bg-white border-blue-500 border-solid border-[1px] py-[6px] px-[16px] rounded-md hover:bg-blue-500 hover:text-white transition-colors"
            >
              Odustanite
            </button>
          </div>
        </div>
      </ReactModal>
      <div className="flex flex-col items-center justify-center md:flex-row mb-5 mt-5">
        <Link href="/admin/news/create">
          <a className="mb-2 transition-colors md:mb-0 mr-4 py-[12px] px-[22px] rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            Objavi novost
          </a>
        </Link>
        <input
          defaultValue=""
          onChange={(e) => debouncedSearch(e.target.value)}
          type="text"
          placeholder="Pretražite po naslovu..."
          className="bg-white border-2 border-black input w-full max-w-xs"
        />
      </div>
      <div className="w-[95%] lg:w-[80%] mx-auto">
        <div className="w-full">
          {isLoading && (
            <div className="w-[100%] flex justify-center">
              <Loader />
            </div>
          )}
          {!isLoading && (
            <table className="table w-full text-white">
              <thead>
                <tr>
                  <th style={{ zIndex: 0 }}>Naslov</th>
                  <th colSpan={2}>Datum objave</th>
                </tr>
              </thead>
              <tbody>
                {data && data[0].length === 0 && (
                  <tr>
                    <td className="lg:max-w-[80px]" />
                    <td className="lg:max-w-[30px]">Trenutno nema novosti</td>
                  </tr>
                )}
                {data &&
                  data[0].map((item) => (
                    <tr key={item.id}>
                      <td className="lg:max-w-[80px]">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12 relative">
                              <Image layout="fill" src={item.thumbnailImageUrl} alt={`${item.title} image`} />
                            </div>
                          </div>
                          <div>
                            <span>{item.title}</span>
                          </div>
                        </div>
                      </td>
                      <td className="lg:max-w-[80px]">
                        <span>{item.createdAt.toLocaleDateString('sr-RS')}</span>
                      </td>
                      <td className="lg:max-w-[30px]">
                        <button
                          onClick={() => handleEditNews(item.id)}
                          className="text-sm w-8 h-8 rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          onClick={() => {
                            setNewsToDelete(item);
                            setOpenModal(true);
                          }}
                          className="ml-4 text-sm w-8 h-8 rounded-full bg-red-600 transition-colors hover:bg-red-700"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        {data && (
          <>
            {size < data[1] && (
              <Pagination
                size={size}
                total={data[1]}
                page={page}
                onPrevClick={() => setPage((currPage) => currPage - 1)}
                onNextClick={() => setPage((currPage) => currPage + 1)}
              />
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNewsPage;
