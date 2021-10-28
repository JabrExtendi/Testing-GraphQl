import utilStyles from '../styles/utils.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

import Posts from '../components/Posts';

export default function SignedIn() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <section>
          {session.user.image && (
            <span style={{ backgroundImage: `url(${session.user.image})` }} />
          )}
          <span>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email || session.user.name}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </a>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <Posts />
        </section>
      </>
    );
  } else {
    return (
      <section>
        <>
          <span>You are not signed in</span>
          <a
            href={`/api/auth/signin`}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </a>
        </>
      </section>
    );
  }
}
