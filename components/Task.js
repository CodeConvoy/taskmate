import { deleteDoc } from 'firebase/firestore';

import styles from '../styles/components/Task.module.css';

export default function Task(props) {
  const { task, taskRef } = props;
  const { title } = props.task;

  // deletes task in firebase
  async function deleteTask() {
    if (!window.confirm('Delete task?')) return;
    await deleteDoc(taskRef);
  }

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
}
