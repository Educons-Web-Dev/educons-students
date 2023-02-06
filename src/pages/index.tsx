import { News } from '@prisma/client';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { Footer, LatestNews } from '../components';
import { prisma } from '../server/db/client';

const Home: NextPage<InferGetStaticPropsType<GetStaticProps>> = (props) => {
  const { latestNews } = props;

  return (
    <>
      <section>
        <div className="m-auto mt-5 w-[90%]">
          <iframe
            className="h-[300px] md:h-[400px] lg:h-[550px] w-[100%] rounded-lg"
            src="https://www.youtube.com/embed/b2fusC51djs"
            title="Studentski dan"
            frameBorder={0}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      {latestNews.length > 0 && (
        <section className="w-[90%] mx-auto mt-[40px]">
          <h1 className="text-[35px] lg:text-[45px] text-black font-bold text-left">Breaking News</h1>
          <div className="h-[1px] w-[100%] bg-black" />
          <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((news: News) => (
              <LatestNews latestNews={news} key={news.id} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-[30px] w-[80%] mx-auto">
        <div className="flex items-start my-[40px] lg:my-[90px]">
          <div className="flex flex-col w-[550px] mr-8 mt-[30px]">
            <h2 className="font-bold text-[30px] lg:text-[40px] mb-4">Zapošljavanje i praksa</h2>
            <p className="text-[rgba(0,0,0,.7)] text-[17px] lg:text-[19px] leading-relaxed">
              Želite da zaposlite neke od naših studenata ili im ponudite vreme i mesto gde mogu da razviju svoje
              veštine? Naš univerzitet se ponosi svojim motivisanim studentima i pogodnostima koje pruža kompanijama
              koje saradjuju sa nama!
            </p>
            <Link href="/students">
              <a className="mt-8 py-3 text-md lg:text-lg px-5 text-center max-w-[200px] border-2 border-transparent hover:bg-white hover:border-red-600 hover:text-red-600 transition-colors bg-red-600 text-white rounded-xl">
                Istaknuti studenti
              </a>
            </Link>
          </div>
          <div className="w-[600px] h-[400px] relative hidden xl:block">
            <Image src="/assets/interview.jpg" alt="interview" className="rounded-xl" layout="fill" />
          </div>
        </div>
      </section>
      <section className="mb-8 mt-[60px] lg:mt-auto hidden lg:block">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-2">
            <h3 className="font-bold text-xl italic text-center">Najveće studentsko sportsko takmičenje</h3>
          </div>
          <div className="bg-white p-2">
            <QRCode
              size={80}
              viewBox="0 0 80 80"
              value="https://euroijada.com/"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const latestNews = await prisma.news.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      latestNews: JSON.parse(JSON.stringify(latestNews)),
    },
    revalidate: 60,
  };
};

export default Home;
