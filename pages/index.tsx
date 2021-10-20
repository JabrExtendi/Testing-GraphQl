import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useQuery, gql, useMutation } from "@apollo/client"


import SignedIn from '../components/SingedIn'


export default function Home() {
  const { data: session, status } = useSession()

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <SignedIn />
      
    </Layout>
  )
}

