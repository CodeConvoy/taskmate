import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <h1>Taskmate</h1>
          <Image src="/logo.png" width="48" height="48" />
        </a>
      </Link>
      <span className="flexfill" />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/projects">
        <a>Projects</a>
      </Link>
    </div>
  );
}
