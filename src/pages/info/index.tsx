import { GetStaticProps } from 'next';
import Head from 'next/head';
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
          UNIVERZITET EDUKONS STUDENTSKI ORIJENTISAN SISTEM NAŠ ZADATAK JE DA ČUJEMO VAŠE POTREBE SUGERIŠITE UKOLIKO
          MISLITE DA TREBA NEŠTO POPRAVITI I USAVRŠITI BUDITE U STALNOJ KOMUNIKACIJI SA PROFESORIMA I STUDENTSKOM
          SLUŽBOM BUDITE VIDLJIVI
        </h1>
        <h2 className="mb-2">
          UPOZNAJTE VAŠE PROFESORE OBRATITE IM SE LIČNO ILI MAILOM BUDITE AKTIVNI TOKOM STUDIJA NEKA PROFESORI UPOZNAJU
          VAS UKOLIKO NISTE U MOGUĆNOSTI DA POHAĐATE NASTAVU JAVITE TO PROFESORU NA POČETKU SEMESTRA KAKO BISTE SE
          DOGOVORILI OKO MODELA I MOGUĆNOSTI POLAGANJA ISPITA UKLJUČITE SE U RAD STUDENTSKE ORGANIZACIJE ISKORISTITE
          MOGUĆNOST ODLASKA NA PRAKSE PRIJAVITE SE ZA MEĐUNARODNU RAZMENU STUDENATA PRATITE UNIVERZITET NA DRUŠTVENIM
          MREŽAMA I ZVANIČNOJ VEB STRANICI UNIVERZITETA SAZNAJTE KOME DA SE OBRATITE UKOLIKO IMATE PROBLEM
        </h2>
        <h3>MI SMO TU ZBOG VAS!</h3>
        <h3 className="mb-2">
          Znanje je moć! Obrazovanjem dobijate mogućnost da birate posao, dok u suprotnom, posao bira Vas!
        </h3>
        <h4 className="mb-1">
          REKTOR <br />
          Prof.dr Aleksandar Andrejević
        </h4>
        <h4 className="mb-1">
          PROREKTOR ZA NAUKU I MEĐUNARODNU SARADNJU <br /> Prof.dr Andrea Andrejević Panić
        </h4>
        <h4 className="mb-1">
          PROREKTOR ZA NASTAVU I KVALITET <br /> Prof.dr Gordana Racić
        </h4>
        <h4 className="mb-3">
          DEKAN FAKULTETA POSLOVNE EKONOMIJE – prof.dr Marko Malović <br /> DEKAN FAKULTETA ZA STUDIJE BEZBEDNOSTI –
          prof.dr Goran Anđelić <br /> DEKAN FAKULTETA EKOLOŠKE POLJOPRIVREDE – prof.dr Olivera Nikolić <br /> DEKAN
          FAKULTETA ZAŠTITE ŽIVOTNE SREDINE – prof.dr Mira Pucarevič <br /> DEKAN FAKULTETA INFORMACIONIH TEHNOLOGIJA –
          prof. dr Aleksandra Rankov <br /> DEKAN FAKULTETA DIGITALNE PRODUKCIJE – prof. dr Predrag Šiđanin <br /> DEKAN
          UČITELJSKOG FAKULTETA - prof.dr Ivica Nikolić
        </h4>
        <h4 className="mb-2">
          IZVRŠNI DIREKTOR GORDANA BRLJAK <br /> Email: gordana.brljak@educons.edu.rs
        </h4>
        <h4>
          STUDENTSKA SLUŽBA ŠEF STUDENTSKE SLUŽBE SANJA ĐEDOVIĆ <br /> Email: sanja.djedovic@educons.edu.rs
        </h4>
        <h4 className="mb-2">
          PRAVNA SLUŽBA Kancelarija 32, stara zgrada <br /> Email: ivana.miskovic@educons.edu.rs
          maja.nesic@educons.edu.rs
        </h4>
        <h4 className="mb-2">
          RAČUNOVODSTVO Kancelarija 33. stara zgrada <br /> Email: zorica.latkovic@educons.edu.rs
          zorana.brljak@educons.edu.rs
        </h4>
        <h4 className="mb-2">
          GENERALNI MENADŽER SLAVICA ANDREJEVIĆ <br /> Email: slavica.andrejević@educons.edu.rs
        </h4>
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
