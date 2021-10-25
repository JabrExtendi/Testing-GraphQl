import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

import { useRouter } from 'next/router';

import { gql, useQuery } from '@apollo/client';
import type { PostByPK, PostByPKVariable } from '../../components/Posts';

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const idInt = parseInt(id as string);

  const QUERY = gql`
    query ($id: Int!) {
      posts_by_pk(id: $id) {
        title
        description
        date
        id
      }
    }
  `;

  const { loading, data, error } = useQuery<PostByPK, PostByPKVariable>(QUERY, {
    variables: { id: idInt },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const postData = data.posts_by_pk;

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>
          {postData.title} : id = {postData.id}
        </h1>
        <div className={utilStyles.lightText}>
          <div> {postData.date} </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.description }} />
      </article>
    </Layout>
  );
}
