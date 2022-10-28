import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useState } from 'react';
import { IKUpload } from 'imagekitio-react';
import { GetServerSideProps } from 'next';
import { ImageKitImage } from '../../../common/models';
import { TipTapEditor } from '../../../components';
import AdminLayout from '../../../layouts/AdminLayout';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '../../../server/router';
import { createContextInner } from '../../../server/router/context';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions as nextAuthOptions } from '../../../pages/api/auth/[...nextauth]';
import { News } from '@prisma/client';
import { trpc } from '../../../utils/trpc';
import { TypeOptions } from 'react-toastify';
import { callToast } from '../../../utils/toast';
import { useRouter } from 'next/router';
import CharacterCount from '@tiptap/extension-character-count';
import { CharactersCount } from '../../../components/TipTapEditor/CharactersCount';

interface IAdminEditNewsPage {
  newsData: News;
}

const AdminEditNewsPage = ({ newsData }: IAdminEditNewsPage) => {
  const router = useRouter();

  const [uploadedImage, setUploadedImage] = useState<ImageKitImage | null>(null);
  const [title, setTitle] = useState(newsData.title);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const limit = 7000;

  const notify = useCallback((message: string, type: TypeOptions) => {
    callToast(message, type);
  }, []);

  const { mutate: updateNewsMutation } = trpc.useMutation('news.updateById', {
    onSuccess: () => {
      notify('Novost uspešno izmenjena!', 'success');
      router.push('/admin/news');
    },
    onError: () => {
      notify('Novost neuspešno izmenjena', 'error');
    },
  });

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
    content: newsData.content,
  });

  const handleSubmit = () => {
    const content = editor?.getHTML();
    const validationError = title === '' || content === '';

    if (validationError) {
      setValidationError(true);
      return;
    }

    if (content) {
      updateNewsMutation({
        id: newsData.id,
        data: {
          title,
          content,
          thumbnailImageUrl: uploadedImage ? uploadedImage.url : newsData.thumbnailImageUrl,
          thumbnailImageId: uploadedImage ? uploadedImage.fileId : newsData.thumbnailImageId,
        },
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
            className="py-[8px] px-[24px] bg-blue-500 text-white rounded-md border-[1px] border-transparent hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors"
          >
            Izmeni
          </button>
          {validationError && <p className="text-red-500 font-bold ml-4">Ispunite sva polja</p>}
        </div>
      </div>
      Hello
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<IAdminEditNewsPage> = async (context) => {
  const session = await getServerSession(context.req, context.res, nextAuthOptions);
  const { newsId } = context.query;

  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session }),
  });

  const data = await ssg.fetchQuery('news.byId', { id: newsId as string });

  return { props: { newsData: JSON.parse(JSON.stringify(data)) } };
};

export default AdminEditNewsPage;
