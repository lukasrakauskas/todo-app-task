import { useState } from "react";
import { Task } from "./tasks";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { title: "Wash dishes", done: false },
    { title: "Read book", done: false },
    { title: "Get some sleep", done: true },
  ]);

  const handleAdd = (newTask: Task) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  const handleComplete = (task: Task) => {
    setTasks((previousTasks) => {
      const index = previousTasks.indexOf(task);

      if (index !== -1) {
        const newTasks = [...previousTasks];
        newTasks[index] = { ...task, done: true };
        return newTasks;
      }

      return previousTasks;
    });
  };

  return { tasks, handleAdd, handleComplete };
}
