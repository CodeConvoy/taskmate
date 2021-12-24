import Loading from '../components/Loading';
import Project from '../components/Project';

import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';

import styles from '../styles/pages/Projects.module.css';

export default function Projects() {
  const db = getFirestore();

  const [title, setTitle] = useState('');

  // listen for projects
  const projectsRef = collection(db, 'projects');
  const [projects] = useCollectionData(projectsRef, { idField: 'id' });

  // adds new project in firebase
  async function addProject() {
    setTitle('');
    await addDoc(projectsRef, { title });
  }

  return (
    <div className={styles.container}>
      <h1>Projects</h1>
      <div className={styles.projects}>
        {
          !projects ?
          <Loading /> :
          projects.map(project =>
            <Project
              project={project}
              projectRef={doc(projectsRef, project.id)}
              key={project.id}
            />
          )
        }
      </div>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          addProject();
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
