import Loading from '../../components/Loading';
import Task from '../../components/Task';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, doc, query, orderBy, addDoc
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  // swaps task orders
  function reorderTasks(indexA, indexB) {
    const [removed] = tasks.splice(indexA, 1);
    tasks.splice(indexB, 0, removed);
    updateOrder();
  }

  // called after todo drag ends
  function onDragEnd(result) {
    if (!result.destination) return; // out of bounds
    if (result.source.index === result.destination.index) return; // same spot
    reorderTasks(result.source.index, result.destination.index);
  }

  return (
    <div className={styles.container}>
      <h1>Project {id}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {
            (provided, snapshot) =>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                tasks &&
                tasks.map((task, i) =>
                <Draggable
                  index={i}
                  draggableId={task.id}
                  key={task.id}
                >
                  {
                    (provided, snapshot) =>
                    <div
                      className={styles.task}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        task={task}
                        taskRef={doc(tasksRef, task.id)}
                        key={task.id}
                      />
                    </div>
                  }
                </Draggable>
                )
              }
              {provided.placeholder}
            </div>
          }
        </Droppable>
      </DragDropContext>
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
