import React from 'react';
import Image from '@tiptap/extension-image';
import NextImage from 'next/image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { prisma } from '../../server/db/client';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '../../server/router';
import superjson from 'superjson';
import { trpc } from '../../utils/trpc';
import Head from 'next/head';
import { useEditor } from '@tiptap/react';
import { TipTapEditor } from '../../components';

const SingleNewsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { newsId } = props;

  const { data } = trpc.useQuery(['news.byId', { id: newsId }]);

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
    ],
    content: data?.content,
    editable: false,
  });

  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta name="description" content={`${data?.title} news page`} />
      </Head>
      <div className="w-[95%] lg:w-[50%] mx-auto my-4">
        <h1 className="text-[40px] lg:text-[50px] font-bold leading-tight">{data?.title}</h1>
        <div className="rounded-xl bg-red-600 w-[60px] h-[7px] mt-2" />
        <div className="w-[100%] h-[280px] md:h-[420px] lg:h-[420px] my-[60px] relative">
          <NextImage layout="fill" alt="Thumbnail image" src={data?.thumbnailImageUrl || ''} />
        </div>
        <div className="mt-4">{editor && <TipTapEditor readonly editor={editor} />}</div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await prisma.news.findMany({
    take: 20,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
    },
  });

  return {
    paths: news.map((n) => ({ params: { newsId: n.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.newsId as string;

  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });

  await ssg.fetchQuery('news.byId', { id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      newsId: id,
    },
    revalidate: 180,
  };
};

export default SingleNewsPage;
