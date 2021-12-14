import styles from '../styles/components/Task.module.css';

export default function Task(props) {
  const { title } = props.task;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
