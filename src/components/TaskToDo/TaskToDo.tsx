import React, {memo} from "react";
import styles from "./styles.module.css";
import {Task} from "../../App";

type Props = {
  taskText: string;
  listTasks: Task[];
  changeListTasks: (listTasks: Task[]) => void;
  id: string;
}

export const TaskToDo = memo((props: Props) => {
  const {taskText, listTasks, changeListTasks, id} = props;
  const onClick = () => {
    const listTasksCopy = [...listTasks];
    const task = listTasksCopy.find((task: Task) => task.id === id);

    if (task) {
      task.status = "inProgress";
      task.taskRunTime = new Date();
      changeListTasks(listTasksCopy);
    }
  };
  return (
    <div className={styles.task}>
      <div>{taskText}</div>
      <button onClick={onClick}>
        Начать
      </button>
    </div>
  );
});
