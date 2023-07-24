import Tasks from "./tasks";
import useTasks from "./use-tasks";

export default function App() {
  const { tasks, handleAdd, handleComplete } = useTasks();

  return <Tasks tasks={tasks} onAdd={handleAdd} onComplete={handleComplete} />;
}
