import React, {memo} from "react";
import styles from "./styles.module.css";

type Props = {
  taskText: string;
  cost: number;
}

export const TaskDone = memo((props: Props) => {
  const {taskText, cost} = props;

  return (
    <div className={styles.task}>
      <div>{taskText}</div>
      <div>{Math.trunc(cost)}руб.{Math.trunc((cost - Math.trunc(cost)) * 100)}коп.</div>
    </div>
  );
});
