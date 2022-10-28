import Head from 'next/head';
import React from 'react';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>404: this page doesn&apos;t exist</title>
        <meta name="description" content="The page you requested could not be found" />
      </Head>
      <div className="flex items-center justify-center mt-20">
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <div className="text-red-600 font-bold text-7xl">404</div>
            <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-3 lg:mt-10">
              Ova stranica ne postoji
            </div>
            <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-4 lg:mt-8">
              Stranica koju ste zatražili nije pronadjena
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
