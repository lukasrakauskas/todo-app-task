import { useState } from "react";
import styled from "styled-components";

export type Task = { title: string; done: boolean };

interface Props {
  tasks: Task[];
  onAdd: (task: Task) => void;
  onComplete: (task: Task) => void;
}

export default function Tasks({ tasks, onAdd, onComplete }: Props) {
  const [title, setTitle] = useState("");

  const active = tasks.filter((task) => !task.done);
  const completed = tasks.filter((task) => task.done);
  const total = tasks.length;

  const addTask = () => {
    onAdd({ title, done: false });
    setTitle("");
  };

  return (
    <div>
      <Actions>
        <input
          placeholder="Task"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </Actions>
      {active.map((task, index) => (
        <Active key={task.title + index} onClick={() => onComplete(task)}>
          {task.title}
        </Active>
      ))}
      {completed.map((task, index) => (
        <Done key={task.title + index}>{task.title}</Done>
      ))}
      <Total>Total tasks: {total}</Total>
    </div>
  );
}

const Active = styled.div`
  font-weight: bold;
`;

const Done = styled.div`
  text-decoration: line-through;
`;

const Total = styled.div`
  padding-top: 10px;
`;

const Actions = styled.div`
  margin: 16px 0;
`;
