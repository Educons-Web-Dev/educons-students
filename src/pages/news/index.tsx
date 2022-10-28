import { createSSGHelpers } from '@trpc/react/ssg';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { NewsCard, Newsletter, Pagination } from '../../components';
import { prisma } from '../../server/db/client';
import { appRouter } from '../../server/router';
import { trpc } from '../../utils/trpc';
import superjson from 'superjson';
import debounce from 'lodash.debounce';

const NewsPage = () => {
  const size = 9;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const data = trpc.useQuery(['news.getAll', { page, size, title: search }]);

  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <>
      <Head>
        <title>News</title>
        <meta name="description" content="See the latest news posted by the Educons team" />
      </Head>
      <div className="w-[95%] lg:w-[75%] mx-auto mt-6">
        <Newsletter />
        <input
          defaultValue=""
          onChange={(e) => debouncedSearch(e.target.value)}
          type="text"
          placeholder="Pretražite novosti..."
          className="bg-[#f6f6fb] mt-8 py-3 px-6 w-full text-[16px] max-w-md rounded-2xl"
        />
        {data.data && data.data[0].length === 0 && (
          <div className="mt-8">
            <h3 className="italic font-bold text-xl text-center text-gray-400">Trenutno nema novosti</h3>
          </div>
        )}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.data && data.data[0].map((news) => <NewsCard newsData={news} key={news.id} />)}
        </div>
        <div className="flex justify-center my-6">
          {data.data && (
            <>
              {size < data.data[1] && (
                <Pagination
                  size={size}
                  total={data.data[1]}
                  page={page}
                  onPrevClick={() => setPage((currPage) => currPage - 1)}
                  onNextClick={() => setPage((currPage) => currPage + 1)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });

  await ssg.fetchQuery('news.getAll', { page: 1, size: 9, title: '' });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 180,
  };
};

export default NewsPage;
