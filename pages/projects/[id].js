import { useRouter } from 'next/router';
import {
  getFirestore, collection, doc, query, orderBy
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../../styles/pages/Project.module.css';

export default function Project() {
  const db = getFirestore();

  // get project id
  const router = useRouter();
  const { id } = router.query;

  // listen for tasks
  const tasksRef = collection(db, 'projects', id ?? '~', 'tasks');
  const tasksQuery = query(tasksRef, orderBy('date', 'desc'));
  const [tasks] = useCollectionData(tasksQuery, { idField: 'id' });

  return (
    <div>
      <h1>Project {id}</h1>
    </div>
  );
}
