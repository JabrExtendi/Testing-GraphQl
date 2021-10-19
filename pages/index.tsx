import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useQuery, gql, useMutation } from "@apollo/client"
import utilStyles from '../styles/utils.module.css'


import ClientOnly from '../components/ClientOnly'
import Posts from '../components/Posts'
import SignedIn from '../components/SingedIn'


export default function Home() {
  const { data: session, status } = useSession()

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <SignedIn />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

        <ClientOnly>
          <Posts />
        </ClientOnly>
      </section>
    </Layout>
  )
}

