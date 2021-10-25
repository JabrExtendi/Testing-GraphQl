import { gql, useQuery } from '@apollo/client';
import type { Posts } from '../components/Posts';

export function getPostById(id) {
  const QUERY = gql`
    query GetAllIds {
      posts_by_pk(post_id: 1) {
        post_title
        post_description
        post_date
        post_id
      }
    }
  `;

  const { data, loading, error } = useQuery<Posts>(QUERY);
  console.log('Data is :', data);
  return data;
}
