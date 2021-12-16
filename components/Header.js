import Link from 'next/link';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Index</a>
      </Link>
      <Link href="/home">
        <a>Home</a>
      </Link>
    </div>
  );
}
