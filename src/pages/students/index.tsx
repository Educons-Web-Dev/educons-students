import React, { useState } from 'react';
import { createSSGHelpers } from '@trpc/react/ssg';
import { GetStaticProps } from 'next';
import { appRouter } from '../../server/router';
import superjson from 'superjson';
import { prisma } from '../../server/db/client';
import { trpc } from '../../utils/trpc';
import { StudentCard } from '../../modules/students';
import debounce from 'lodash.debounce';
import { Pagination } from '../../components';
import Head from 'next/head';

const StudentsPage = () => {
  const size = 9;
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const data = trpc.useQuery(['user.withResume', { name: search, page, size }]);

  const debouncedHandleChange = debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <>
      <Head>
        <title>Students</title>
        <meta name="description" content="Featured students from the Educons university" />
      </Head>
      <div>
        <div className="flex justify-center mt-5">
          <input
            type="text"
            placeholder="Ime studenta"
            className="input bg-white border-2 border-gray-300 w-full max-w-xs"
            onChange={(e) => debouncedHandleChange(e.target.value)}
          />
        </div>
        {data.data && data.data[0].length === 0 && (
          <div className="max-w-[1280px] mt-[50px] mx-auto">
            <h3 className="italic font-bold text-xl text-center text-gray-400">Trenutno nema istaknutih studenata</h3>
          </div>
        )}
        {data.data && (
          <div className="max-w-[1280px] px-4 mb-5 mx-auto mt-[50px] grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 gap-5">
            {data.data[0].map((student) => (
              <StudentCard key={student.id} student={student} resume={student.resume!} />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-8 mb-4">
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

  await ssg.fetchQuery('user.withResume', { name: '', page: 1, size: 9 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 180,
  };
};

export default StudentsPage;
