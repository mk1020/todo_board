import React, {useState} from "react";
import styles from "./styles.module.css";
import {NewTask} from "./components/NewTask/NewTask";
import {TaskToDo} from "./components/TaskToDo/TaskToDo";
import {TaskInProgress} from "./components/TaskInProgress/TaskInProgress";
import {TaskDone} from "./components/TaskDone/TaskDone";

const costOfHour = 1000;

export type Task = {
  status: "todo" | "inProgress" | "done";
  taskText: string;
  taskRunTime: Date | null | number;
  taskCost: number;
  id: string;
}

export function App() {
  const [listTasks, changeListTasks] = useLocalStorage("toDo", []);

  return (
    <div className={styles.container}>
      <div className={styles.tasksColumn}>
        <div className={styles.tasksColumn__title}>To Do</div>
        {listTasks.map((task: Task, index: number) => task.status === "todo" ? (
          <TaskToDo
            taskText={task.taskText}
            listTasks={listTasks}
            changeListTasks={changeListTasks}
            id={task.id}
            key={`TaskToDo${index}`}
          />
        ) : null)}
        <NewTask
          changeListTasks={changeListTasks}
          listTasks={listTasks}
        />
      </div>
      <div className={styles.tasksColumn}>
        <div className={styles.tasksColumn__title}>In Progress</div>
        {listTasks.map((task: Task, index: number) => task.status === "inProgress" ? (
          <TaskInProgress
            taskText={task.taskText}
            listTasks={listTasks}
            changeListTasks={changeListTasks}
            costOfHour={costOfHour}
            id={task.id}
            key={`TaskInProgress${index}`}
          />
        ) : null)}
      </div>
      <div className={styles.tasksColumn}>
        <div className={styles.tasksColumn__title}>Done</div>
        {listTasks.map((task: Task, index: number) => task.status === "done" ? (
          <TaskDone
            taskText={task.taskText}
            cost={task.taskCost}
            key={`TaskDone${index}`}
          />
        ) : null)}
      </div>
    </div>
  );
}

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    !item && window.localStorage.setItem(key, JSON.stringify(initialValue));

    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: typeof storedValue) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
