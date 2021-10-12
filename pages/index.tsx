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
  // allPostsData: {
  //   date: string,
  //   title: string,
  //   id: string
  // }[]
  allPostsData: {
    code: string,
    name: string,
    emoji: string
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
          {allPostsData.map(({ code, emoji, name }) => (
            <li className={utilStyles.listItem} key={code}>
              <Link href={`/posts/${code}`}>
                <a>{name}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {/* <Date dateString={date} /> */}
                {emoji}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}


export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      allPostsData: data.countries.slice(0, 4),
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
