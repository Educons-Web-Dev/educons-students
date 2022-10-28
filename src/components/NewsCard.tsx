import { News } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import calculateReadingTime from '../utils/calculateReadingTIme';

interface INewsCardProps {
  newsData: News;
}

export const NewsCard = ({ newsData }: INewsCardProps) => {
  const router = useRouter();
  const readingTime = calculateReadingTime(newsData.content.length);

  const checkIfNew = () => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - 4);

    return pastDate <= newsData.createdAt;
  };

  const handleClick = () => router.push(`/news/${newsData.id}`);

  return (
    <div
      className="card h-fit rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={handleClick}
    >
      <figure className="w-[100%] h-[216px] relative">
        <Image src={newsData.thumbnailImageUrl} layout="fill" alt={`${newsData.title} news thumbnail image`} />
      </figure>
      <div className="card-body">
        <div className="flex items-center">
          <span className="text-sm">{newsData.createdAt.toLocaleDateString('sr-RS')}</span>
          <div className="rounded-full mx-2 w-[4px] h-[4px] bg-red-600" />
          <span className="text-sm">{readingTime} min čitanja</span>
        </div>
        <div className="flex items-center">
          <h2 className="card-title">{newsData.title}</h2>
          {checkIfNew() && (
            <div className="badge self-start mt-1 bg-red-500 ml-4 text-white border-transparent">NEW</div>
          )}
        </div>
      </div>
    </div>
  );
};
