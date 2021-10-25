import { useQuery, gql, useMutation } from '@apollo/client';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export type Post = {
  id: number;
  date: string;
  title: string;
  description: string;
};

export type Posts = {
  post: Post[];
};

export type PostByPK = {
  posts_by_pk: Post;
};

export type PostByPKVariable = {
  id: number;
};

function EditPost({ PostId }) {
  const EditPostMutation = gql`
    mutation UpdatePost($PostId: Int!) {
      update_post_by_pk(
        pk_columns: { id: $PostId }
        _set: {
          date: "2021-11-28"
          description: "updated description"
          title: "Really updated Title"
        }
      ) {
        date
        description
        id
        title
      }
    }
  `;

  const [mutateFunction, {  loading, error }] =
    useMutation(EditPostMutation);

  if (loading) return <>{"Submitting..."}</>;
  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <button
      className="inline-block mx-3 bg-red-200 my-2 rounded p-2 hover:bg-red-500"
      onClick={() => {
        console.log(PostId);
        mutateFunction({ variables: { PostId: PostId } });
      }}
    >
      Update Below Post
    </button>
  );
}

function DeletePost({ PostId }) {
  const DeletePostMutation = gql`
    mutation DeletePost($PostId: Int!) {
      delete_post_by_pk(id: $PostId) {
        date
        description
        id
        title
      }
    }
  `;

  const [mutateFunction, { loading, error }] = useMutation(DeletePostMutation);

  if (loading) return <>{"Submitting..."}</>;
  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <button
      className="inline-block mx-3 bg-red-200 my-2 rounded p-2 hover:bg-red-500"
      onClick={() => {
        mutateFunction({ variables: { PostId: PostId } });
      }}
    >
      Delete Below Post
    </button>
  );
}

function AddPost() {
  const AddPostMutation = gql`
    mutation AddPost {
      insert_post(
        objects: [
          {
            date: "2021-05-07"
            description: "A post to try out the mutation"
            title: "A new title"
          }
        ]
      ) {
        returning {
          id
          title
          description
          date
        }
      }
    }
  `;

  const [mutateFunction, { loading, error }] =
    useMutation(AddPostMutation);

  if (loading) return <>{"Submitting..."}</>;
  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <button
      className="inline-block mx-3 bg-red-200 my-2 rounded p-2 hover:bg-red-500"
      onClick={() => {
        console.log();
        mutateFunction();
      }}
    >
      Add new post
    </button>
  );
}

export default function Posts() {
  const QUERY = gql`
    query MyQuery {
      post {
        title
        description
        date
      }
    }
  `;

  const { data, loading, error } = useQuery<Posts>(QUERY);

  if (loading) {
    return (
      <h2>
        <a
          href="#loading"
          aria-hidden="true"
          className="aal_anchor"
          id="loading"
        >
          <svg
            aria-hidden="true"
            className="aal_svg"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Loading...
      </h2>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  console.log('the data is : ' + JSON.stringify(data));

  const posts = data.post;

  return (
    <div className={utilStyles.list}>
      {posts.map(({ title, date, id, description }) => (
        <li className={utilStyles.listItem} key={id}>
          <Link href={`/posts/${id}`}>
            <a>{title}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>{date}</small>
          <br />

          <DeletePost PostId={id} />

          <EditPost PostId={id} />
          <div className="bg-red-500">{description}</div>
        </li>
      ))}

      <AddPost />
    </div>
  );
}
