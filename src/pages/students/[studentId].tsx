import React, { useRef } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { prisma } from '../../server/db/client';
import { createSSGHelpers } from '@trpc/react/ssg';
import superjson from 'superjson';
import { appRouter } from '../../server/router';
import { trpc } from '../../utils/trpc';
import { ResumeParser } from '../../modules/resume';
import { Resume as ResumeType } from '../../common/models/Resume';
import Head from 'next/head';
import ReactToPrint from 'react-to-print';

const StudentPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { studentId } = props;
  const resumeRef = useRef(null);

  const data = trpc.useQuery(['user.userResume', { userId: studentId }]);

  const resumeContent: ResumeType = JSON.parse(data.data!.content!);

  return (
    <>
      <Head>
        <title>{resumeContent.name}</title>
      </Head>
      <div className="flex flex-col justify-center items-center my-4">
        <ReactToPrint
          documentTitle={`Resume - ${resumeContent.name}`}
          content={() => resumeRef.current}
          trigger={() => (
            <button className="bg-blue-500 mb-3 text-white hover:bg-blue-600 transition-colors font-bold py-2 px-4 rounded inline-flex items-center">
              <i className="fa-solid fa-download mr-2"></i>
              <span>Preuzmite kao PDF</span>
            </button>
          )}
        />
        <div ref={resumeRef}>
          <ResumeParser resumeContent={resumeContent} />
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const students = await prisma.user.findMany({
    take: 9,
    where: {
      resume: {
        isNot: null,
      },
    },
    select: {
      id: true,
    },
  });

  return {
    paths: students.map((student) => ({ params: { studentId: student.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.studentId as string;

  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: { session: null, prisma },
    transformer: superjson,
  });

  await ssg.fetchQuery('user.userResume', { userId: id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      studentId: id,
    },
    revalidate: 180,
  };
};

export default StudentPage;
