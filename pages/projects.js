import Loading from '../components/Loading';
import Project from '../components/Project';

import { getFirestore, collection, addDoc } from 'firebase/firestore';
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
    <div>
      <h1>Projects</h1>
      {
        !projects ?
        <Loading /> :
        projects.map(project =>
          <Project project={project} key={project.id} />
        )
      }
      <form
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
