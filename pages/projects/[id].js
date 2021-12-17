import Loading from '../../components/Loading';
import Task from '../../components/Task';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, doc, query, orderBy, addDoc
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../../styles/pages/Project.module.css';

export default function Project() {
  const auth = getAuth();
  const db = getFirestore();

  const [title, setTitle] = useState('');

  // get project id
  const router = useRouter();
  const { id } = router.query;

  // listen for tasks
  const tasksRef = collection(db, 'projects', id ?? '~', 'tasks');
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

  return (
    <div className={styles.container}>
      <h1>Project {id}</h1>
      <div className={styles.tasks}>
        {
          !tasks ?
          <Loading /> :
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
