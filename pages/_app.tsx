import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import CustomApolloContext from '../components/CustomApolloContext';

import '../styles/global.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <CustomApolloContext>
        <Component {...pageProps} />
      </CustomApolloContext>
    </SessionProvider>
  );
}
