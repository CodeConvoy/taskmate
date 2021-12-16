import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

import { deleteDoc } from 'firebase/firestore';

import styles from '../styles/components/Project.module.css';

export default function Project(props) {
  const { project, projectRef } = props;
  const { id, title } = project;

  // deletes project in firebase
  async function deleteProject() {
    if (!window.confirm('Delete task?')) return;
    await deleteDoc(projectRef);
  }

  return (
    <div className={styles.container}>
      <Link href={`/projects/${id}`}>
        <a>{title}</a>
      </Link>
      <button onClick={deleteProject}>
        <DeleteIcon />
      </button>
    </div>
  );
}
