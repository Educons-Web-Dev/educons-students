import React, { useState, useCallback } from 'react';
import { TipTapEditor } from '../../../components';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEditor } from '@tiptap/react';
import { IKUpload } from 'imagekitio-react';
import { ImageKitImage } from '../../../common/models';
import { trpc } from '../../../utils/trpc';
import { useRouter } from 'next/router';
import { TypeOptions } from 'react-toastify';
import AdminLayout from '../../../layouts/AdminLayout';
import { callToast } from '../../../utils/toast';
import CharacterCount from '@tiptap/extension-character-count';
import { CharactersCount } from '../../../components/TipTapEditor/CharactersCount';

const AdminCreateNewsPage = () => {
  const router = useRouter();
  const notify = useCallback((message: string, type: TypeOptions) => {
    callToast(message, type);
  }, []);
  const { mutate: createNewsMutation } = trpc.useMutation('news.create', {
    onSuccess: () => {
      router.push('/admin/news');
      notify('Novost objavljena!', 'success');
    },
    onError: () => {
      notify('Neuspešno objavljivanje novosti', 'error');
    },
  });

  const [uploadedImage, setUploadedImage] = useState<ImageKitImage | null>(null);
  const [title, setTitle] = useState('');
  const [imageSuccess, setImageSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const limit = 7000;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
        history: { depth: 10 },
        bulletList: {
          itemTypeName: 'listItem',
          HTMLAttributes: {
            class: 'pl-[40px] list-disc',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        protocols: ['ftp', 'mailto'],
        openOnClick: true,
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Underline,
      Image,
      CharacterCount.configure({
        limit,
      }),
    ],
    content: '<p>Sadržaj...</p>',
  });

  const handleSubmit = () => {
    const content = editor?.getHTML();
    const validationError = !uploadedImage || title === '' || content === '';

    if (validationError) {
      setValidationError(true);
      return;
    }

    if (content) {
      createNewsMutation({
        title,
        thumbnailImageUrl: uploadedImage.url,
        thumbnailImageId: uploadedImage.fileId,
        content,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="w-[95%] lg:w-[50%] mx-auto mt-4 pb-[100px]">
        <div className="mb-4 mt-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Naslov"
            className="bg-white border-2 border-black input w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-xl mb-2">Naslovna fotografija</h3>
          <IKUpload
            className="w-[250px]"
            folder="/educons"
            onSuccess={(resp: ImageKitImage) => {
              setImageSuccess(true);
              setImageError(false);
              setUploadedImage(resp);
            }}
            onError={(resp: any) => {
              setImageSuccess(false);
              setImageError(true);
              setUploadedImage(null);
            }}
          />
          {imageSuccess && <i className="fa-solid fa-circle-check text-green-400"></i>}
          {imageError && <i className="fa-solid fa-circle-xmark text-red-600"></i>}
        </div>
        {editor && (
          <>
            <div className="mb-4">
              <TipTapEditor editor={editor} />
            </div>
            <CharactersCount charCount={editor?.storage.characterCount.characters()} limit={limit} />
          </>
        )}
        <div className="flex items-center">
          <button
            onClick={handleSubmit}
            className="py-[6px] px-[16px] bg-blue-500 text-white rounded-md border-[1px] border-transparent hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors"
          >
            Objavi
          </button>
          {validationError && <p className="text-red-500 font-bold ml-4">Ispunite sva polja</p>}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateNewsPage;
