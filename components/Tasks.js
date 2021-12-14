import Task from './Task';
import Loading from './Loading';

import { useState } from 'react';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Tasks.module.css';

export default function Tasks() {
  const db = getFirestore();

  const [title, setTitle] = useState('');

  // listen for tasks
  const tasksRef = collection(db, 'tasks');
  const [tasks] = useCollectionData(tasksRef, { idField: 'id' });

  // adds new task in firebase
  async function addTask() {
    setTitle('');
    await addDoc(tasksRef, { title });
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
      <form onSubmit={e => {
        e.preventDefault();
        addTask();
      }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <button>New Task</button>
      </form>
    </div>
  );
}
