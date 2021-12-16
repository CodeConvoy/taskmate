import Loading from '../components/Loading';
import Project from '../components/Project';

import { getFirestore, collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/pages/Projects.module.css';

export default function Projects() {
  const db = getFirestore();

  // listen for projects
  const projectsRef = collection(db, 'projects');
  const [projects] = useCollectionData(projectsRef, { idField: 'id' });

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
    </div>
  );
}
