import Task from './Task';

import styles from '../styles/components/Tasks.module.css';

export default function Tasks() {
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
