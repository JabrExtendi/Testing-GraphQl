import { AppProps, } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'


import '../styles/global.css'

export default function App({ Component,
  pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
