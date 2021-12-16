import Link from 'next/link';

import styles from '../styles/components/Project.module.css';

export default function Project(props) {
  const { project } = props;
  const { id, title } = project;

  return (
    <div className={styles.container}>
      <Link href={`/projects/${id}`}>
        <a>{title}</a>
      </Link>
    </div>
  );
}
