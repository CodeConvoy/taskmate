import Task from './Task';
import Loading from './Loading';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, addDoc, doc, query, orderBy
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Tasks.module.css';

export default function Tasks() {
  const auth = getAuth();
  const db = getFirestore();

  const [title, setTitle] = useState('');

  // listen for tasks
  const tasksRef = collection(db, 'tasks');
  const tasksQuery = query(tasksRef, orderBy('date', 'desc'));
  const [tasks] = useCollectionData(tasksQuery, { idField: 'id' });

  // adds new task in firebase
  async function addTask() {
    setTitle('');
    await addDoc(tasksRef, {
      title: title,
      date: new Date().getTime(),
      uid: auth.currentUser.uid
    });
  }

  // return if loading tasks
  if (!tasks) return <Loading />;

  return (
    <div>
      <div className={styles.tasks}>
        {
          tasks.map(task =>
            <Task
              task={task}
              taskRef={doc(tasksRef, task.id)}
              key={task.id}
            />
          )
        }
      </div>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <button>New Task</button>
      </form>
    </div>
  );
}
