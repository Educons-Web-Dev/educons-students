import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

const InfoPage = () => {
  return (
    <>
      <Head>
        <title>Info</title>
        <meta name="description" content="General info" />
      </Head>

      <div className="lg:w-[60%] w-[80%] mx-auto text-center">
        <h1 className="mb-2 mt-3 leading-normal">
          UNIVERZITET EDUKONS STUDENTSKI ORIJENTISAN SISTEM <br />{' '}
          <strong>NAŠ ZADATAK JE DA ČUJEMO VAŠE POTREBE </strong>
          <br /> SUGERIŠITE UKOLIKO MISLITE DA TREBA NEŠTO POPRAVITI I USAVRŠITI BUDITE U STALNOJ KOMUNIKACIJI SA
          PROFESORIMA I STUDENTSKOM SLUŽBOM BUDITE VIDLJIVI
        </h1>
        <h2 className="mb-2">
          UPOZNAJTE VAŠE PROFESORE OBRATITE <br />
          IM SE LIČNO ILI MAILOM
          <br /> BUDITE AKTIVNI TOKOM STUDIJA
          <br /> NEKA PROFESORI UPOZNAJU VAS
          <br /> UKOLIKO NISTE U MOGUĆNOSTI DA POHAĐATE NASTAVU JAVITE TO PROFESORU NA POČETKU SEMESTRA KAKO BISTE SE
          DOGOVORILI OKO MODELA I MOGUĆNOSTI POLAGANJA ISPITA
          <br /> UKLJUČITE SE U RAD STUDENTSKE ORGANIZACIJE
          <br /> ISKORISTITE MOGUĆNOST ODLASKA NA PRAKSE
          <br /> PRIJAVITE SE ZA MEĐUNARODNU RAZMENU STUDENATA
          <br /> PRATITE UNIVERZITET NA DRUŠTVENIM MREŽAMA I ZVANIČNOJ VEB STRANICI
          <br /> UNIVERZITETA SAZNAJTE KOME DA SE OBRATITE UKOLIKO IMATE PROBLEM
          <br />
        </h2>
        <h3>MI SMO TU ZBOG VAS!</h3>
        <h3 className="mb-2 text-[#9D9D9D]">
          Znanje je moć! Obrazovanjem dobijate mogućnost da birate posao, dok u suprotnom, posao bira Vas!
        </h3>
        <div className="lg:w-[700px] lg:h-[400px] w-[320px] h-[200px] relative lg:my-2 my-5 mx-auto">
          <Image src="/assets/diagram.png" alt="emails graphic presentation" layout="fill" />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600,
  };
};

export default InfoPage;
