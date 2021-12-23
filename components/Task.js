import Dialog from './Dialog';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteDoc } from 'firebase/firestore';

import styles from '../styles/components/Task.module.css';

export default function Task(props) {
  const { task, taskRef } = props;
  const { title, description } = props.task;

  // deletes task in firebase
  async function deleteTask() {
    if (!window.confirm('Delete task?')) return;
    await deleteDoc(taskRef);
  }

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={deleteTask}>
        <DeleteIcon />
      </button>
      <Dialog open={dialogOpen} setOpen={setDialogOpen}>
        <h1>Editing {title}</h1>
        <form onSubmit={e => {
          e.preventDefault();
          updateTask();
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
