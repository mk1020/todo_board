import React, {useCallback, useEffect, useState, memo} from "react";
import {Task} from "../../App";
import styles from "./styles.module.css";
import moment from "moment";

type Props = {
  taskText: string;
  listTasks: Task[];
  changeListTasks: (listTasks: Task[]) => void;
  costOfHour: number;
  id: string;
}

export const TaskInProgress = memo((props: Props) => {
  const {taskText, listTasks, changeListTasks, costOfHour, id} = props;
  const [time, changeTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => changeTime((time) => time + 1000), 1000);

    return () => clearInterval(interval);
  }, []);

  const getTime = () => {
    const s = moment.duration(time).seconds();
    const m = moment.duration(time).minutes();
    const h = moment.duration(time).hours();
    return {
      s: s < 10 ? "0" + s : s,
      m: m < 10 ? "0" + m : m,
      h: h < 10 ? "0" + h : h,
    };
  };

  const onClickDone = () => {
    const listTasksCopy = [...listTasks];
    const task = listTasksCopy.find((task: Task) => task.id === id);
    const taskIndex = listTasksCopy.findIndex((task: Task) => task.id === id);

    if (task) {
      task.status = "done";
      task.taskRunTime = time;
      task.taskCost = Number(getTime().h) * costOfHour +
        Number(getTime().m) / 60 * costOfHour +
        Number(getTime().s) / 60 / 60 * costOfHour;

      listTasksCopy.push(task);
      listTasksCopy.splice(taskIndex, 1);

      changeListTasks(listTasksCopy);
    }
  };

  return (
    <div className={styles.task}>
      <div>{taskText}</div>
      <div>
        {getTime().h}:{getTime().m}:{getTime().s}
      </div>
      <button onClick={onClickDone}>
        Завершить
      </button>
    </div>
  );
});
