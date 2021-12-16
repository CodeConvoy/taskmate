import { useRouter } from 'next/router';

import styles from '../../styles/pages/Project.module.css';

export default function Project() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Project {id}</h1>
    </div>
  );
}
