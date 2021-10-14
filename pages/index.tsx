import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'


import ClientOnly from '../components/ClientOnly'
import Posts from '../components/Posts'


export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          The information below is currently hardcoded, as it is being used just for testing purposes.
        </p>
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

