import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

import { gql } from '@apollo/client'
import client from '../apollo-client'


export default function Home({ allPostsData }: {
  allPostsData: {
    post_date: string,
    post_title: string,
    post_id: string,
    post_description: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey there! I am learinig Next.</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* {allPostsData.map(({ id, date, title }) => ( */}
          {allPostsData.map(({ post_title, post_date, post_id, post_description }) => (
            <li className={utilStyles.listItem} key={post_id}>
              <Link href={`/posts/${post_id}`}>
                <a>{post_title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={post_date} />
              </small>
              <>{post_description}</>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}


// export async function getStaticProps() {
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
    query MyQuery {
      posts {
        post_id
        post_title
        post_description
        post_date
      }
    }
    `,
  });

  return {
    props: {
      allPostsData: data.posts,
    },
  };
}



// Original code to get data from local

// export const getStaticProps: GetStaticProps = async () => {

//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }
