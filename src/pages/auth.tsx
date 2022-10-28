import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getCsrfToken, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

interface IAuthProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
  csrfToken: string;
}

const AuthPage = ({ providers, csrfToken }: IAuthProps) => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="Educons Students Login Page" content="Authenticate" />
      </Head>
      <div className="flex h-[calc(100vh-64px)] p-2 md:p-6 bg-black">
        <div className="hidden md:block w-[60%] relative border-r-black border-r-2">
          <Image
            className="rounded-bl-md rounded-tl-md"
            layout="fill"
            objectFit="cover"
            src="/assets/mosaic.jpg"
            alt="mosaic"
          />
        </div>
        <div className="w-[100%] md:w-[40%] bg-white rounded-md md:rounded-bl-none md:rounded-tl-none md:rounded-br-md md:rounded-tr-md">
          <div className="mt-[170px]">
            <h1 className="font-bold text-2xl lg:text-3xl text-center mb-4">Pridruži se kolegama</h1>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="flex justify-center">
              {providers &&
                Object.values(providers).map((provider) => (
                  <div key={provider.name}>
                    <button
                      className="py-[6px] px-[16px] rounded-md shadow-md border-black border-2 hover:bg-black hover:text-white transition-colors"
                      onClick={() => signIn(provider.id)}
                    >
                      Prijavi se sa {provider.name}-om
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers,
      csrfToken,
    },
  };
};
