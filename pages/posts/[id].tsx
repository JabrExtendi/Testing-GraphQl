import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

import { useRouter } from 'next/router'

import { gql, useQuery } from '@apollo/client'
import type { PostByPK, Post, Posts, PostByPKVariable } from '../../components/Posts'


export default function PostPage() {

  const router = useRouter()
  const {id} = router.query
  console.log(id)
  const idInt = parseInt(id as string)
  console.log("id is: ", id)


  const QUERY = gql`
  query ($post_id: Int!){
    posts_by_pk(post_id: $post_id) {
      post_title
      post_description
      post_date
      post_id
    }
  }
`;

  const post_id = id
  const { loading, data, error } = useQuery<PostByPK, PostByPKVariable>(QUERY, {
    variables: {post_id : idInt}
  });

  if (loading) {

    return <div>Loading...</div>;

  }

  if (error) {

    console.error(error);

    return <div>Error!</div>;

  }


  console.log("Data is :",data)

  const postData = data.posts_by_pk

  return (
    // <>testing</>
    <Layout>
      <Head>
        <title>{postData.post_title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.post_title} : id = {postData.post_id}</h1>
        <div className={utilStyles.lightText}>
          <div> {postData.post_date} </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.post_description }} />
      </article>
    </Layout>
  )
}
