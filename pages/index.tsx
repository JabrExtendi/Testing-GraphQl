import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useQuery, gql, useMutation } from "@apollo/client"
import utilStyles from '../styles/utils.module.css'


import ClientOnly from '../components/ClientOnly'
import Posts from '../components/Posts'


export default function Home() {
  const [ session, loading ] = useSession()

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        {!session && <>
            <span>You are not signed in</span>
            <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }}/>}
            <span >
              <small>Signed in as</small><br/>
              <strong>{session.user.email || session.user.name}</strong>
              </span>
            <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
          </>}
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

        <ClientOnly>
          <Posts/>
        </ClientOnly>
      </section>
    </Layout>
  )
}

