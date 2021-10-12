import { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'

import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
