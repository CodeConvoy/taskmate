import Link from 'next/link';
import Image from 'next/image';

import { getAuth, signOut } from 'firebase/auth';
import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  const auth = getAuth();

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <Image
          src="/logo.png"
          width="48"
          height="48"
        />
        <h1>Taskmate</h1>
        <div className={styles.links}>
          {
            auth.currentUser &&
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          }
        </div>
        {
          auth.currentUser ?
          <button onClick={() => signOut(auth)}>
            Sign Out
          </button> :
          <button onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        }
      </div>
    </div>
  );
}
