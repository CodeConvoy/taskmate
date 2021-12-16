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
    </div>
  );
}
