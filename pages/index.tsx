import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

import SignedIn from '../components/SingedIn';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <SignedIn />
    </Layout>
  );
}
