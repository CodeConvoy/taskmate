import Task from './Task';
import Loading from './Loading';

import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Tasks.module.css';

export default function Tasks() {
  const db = getFirestore();

  // listen for tasks
  const tasksRef = collection(db, 'tasks');
  const [tasks] = useCollectionData(tasksRef, { idField: 'id' });

  // return if loading tasks
  if (!tasks) return <Loading />;

  return (
    <div>
      {
        tasks.map(task =>
          <Task task={task} key={task.id} />
        )
      }
    </div>
  );
}
