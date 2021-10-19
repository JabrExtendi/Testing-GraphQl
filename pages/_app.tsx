import { AppProps, } from 'next/app'
import { Provider } from "next-auth/client"

import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'


import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}
