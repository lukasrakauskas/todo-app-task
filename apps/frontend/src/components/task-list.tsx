import styled from "styled-components";
import ActiveTask from "./active-task";
import { Task } from "../api";
import TaskForm from "./task-form";

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  const active = tasks.filter((task) => !task.done);
  const completed = tasks.filter((task) => task.done);
  const total = tasks.length;

  return (
    <div>
      <TaskForm />
      {active.map((task) => (
        <ActiveTask key={task.id} task={task} />
      ))}
      {completed.map((task) => (
        <Done key={task.id}>{task.title}</Done>
      ))}
      <Total>Total tasks: {total}</Total>
    </div>
  );
}

const Done = styled.div`
  text-decoration: line-through;
`;

const Total = styled.div`
  padding-top: 10px;
`;
