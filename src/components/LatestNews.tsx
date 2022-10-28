import React from 'react';
import { News } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ILatestNews {
  latestNews: News;
}

export const LatestNews = ({ latestNews }: ILatestNews) => {
  const router = useRouter();

  const handleClick = () => router.push(`/news/${latestNews.id}`);

  return (
    <div className="p-4">
      <div className="rounded-xl shadow-md overflow-hidden">
        <div className="relative h-[211px]">
          <Image
            className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
            src={latestNews.thumbnailImageUrl}
            alt="blog"
            layout="fill"
          />
        </div>
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {new Date(latestNews.createdAt).toLocaleDateString('sr-RS')}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-600 mb-3">{latestNews.title}</h1>
          <div className="flex items-center flex-wrap">
            <button
              onClick={handleClick}
              className="py-1 ml-[-3px] text-sm px-3 text-center border-2 border-transparent hover:bg-white hover:border-red-600 hover:text-red-600 transition-colors bg-red-600 text-white rounded-lg"
            >
              Pogledaj više
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
