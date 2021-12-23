import Dialog from './Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useState } from 'react';
import { deleteDoc, updateDoc } from 'firebase/firestore';

import styles from '../styles/components/Task.module.css';

export default function Task(props) {
  const { task, taskRef } = props;
  const { title, description } = props.task;

  const [newTitle, setNewTitle] = useState(title);
  const [dialogOpen, setDialogOpen] = useState(false);

  // deletes task in firebase
  async function deleteTask() {
    if (!window.confirm('Delete task?')) return;
    await deleteDoc(taskRef);
  }

  // updates task in firebase
  async function updateTask() {
    setDialogOpen(false);
    await updateDoc(taskRef, { title: newTitle });
  }

  // resets dialog data
  function resetDialog() {
    setNewTitle(title);
  }

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={deleteTask}>
        <DeleteIcon />
      </button>
      <button onClick={() => {
        resetDialog();
        setDialogOpen(true);
      }}>
        <EditIcon />
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
