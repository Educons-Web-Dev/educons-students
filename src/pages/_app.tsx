// src/pages/_app.tsx
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '../server/router';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';
import { IKContext } from 'imagekitio-react';
import '../styles/globals.css';
import { LayoutNavbar } from '../layouts';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getBaseUrl = () => {
  if (typeof window !== undefined) return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <IKContext
        publicKey={process.env.IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={process.env.IMAGEKIT_URL}
        authenticationEndpoint={`${getBaseUrl()}/api/imagekit/auth`}
      >
        <LayoutNavbar>
          <Head>
            <title>Educons Students</title>
            <meta name="description" content="Web App for the students of the Educons university" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          </Head>
          <Script src="https://kit.fontawesome.com/c500145575.js" strategy="afterInteractive" />
          <ToastContainer />
          <Component {...pageProps} />
        </LayoutNavbar>
      </IKContext>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
