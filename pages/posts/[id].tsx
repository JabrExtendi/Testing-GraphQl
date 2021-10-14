import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

import { useRouter } from 'next/router'



import { gql, useQuery } from '@apollo/client'
import type { Posts } from '../../components/Posts'


export function getPostById(id) {


  

}


export default function Post() {

  const router = useRouter()
  const {id} = router.query
  console.log("id is: ", id)


  const QUERY = gql`
  query ($requiredPostId: Int!){
    posts_by_pk(post_id: $requiredPostId) {
      post_title
      post_description
      post_date
      post_id
    }
  }
`;

  const requiredPostId = id
  const { data, loading, error } = useQuery<any>(QUERY, {
    variables: {requiredPostId}
  });

  if (loading) {

    return <div>Loading...</div>;

  }

  if (error) {

    console.error(error);

    return <div>Error!</div>;

  }


  console.log("Data is :",data)
  console.log("Data is :",data.posts_by_pk)

  const postData = data.posts_by_pk

  return (
    <Layout>
      <Head>
        <title>{postData.post_title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.post_title} : id = {postData.post_id}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.post_date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.post_description }} />
      </article>
    </Layout>
  )
}
