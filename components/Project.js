import Dialog from './Dialog';
import Link from 'next/link';

import { deleteDoc } from 'firebase/firestore';

import styles from '../styles/components/Project.module.css';

export default function Project(props) {
  const { project, projectRef } = props;
  const { id, title } = project;

  // deletes project in firebase
  async function deleteProject() {
    if (!window.confirm('Delete project?')) return;
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
      <Dialog open={dialogOpen} setOpen={setDialogOpen}>
        <h1>Editing {title}</h1>
        <form onSubmit={e => {
          e.preventDefault();
          updateProject();
        }}>
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
          />
          <button>Update</button>
        </form>
      </Dialog>
    </div>
  );
}
