import React, {memo} from "react";
import {Task} from "../../App";
import {v4 as uuidv4} from "uuid";
import styles from "./styles.module.css";

type Props = {
  listTasks: Task[];
  changeListTasks: (listTasks: Task[]) => void;
}
export const NewTask = memo((props: Props) => {
  const {changeListTasks, listTasks} = props;
  const onClick = () => {
    const taskText = window.prompt("Введите текст задачи");
    if (taskText) {
      const newTask: Task = {
        status: "todo",
        taskText,
        taskCost: -1,
        taskRunTime: null,
        id: uuidv4(),
      };

      changeListTasks([...listTasks, newTask]);
    }
  };
  return (
    <button className={styles.newTask} onClick={onClick}>
      Новая задача
    </button>
  );
});
