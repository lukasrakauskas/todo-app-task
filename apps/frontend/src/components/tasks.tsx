import TaskList from "./task-list";
import { useQuery } from "@tanstack/react-query";
import { client } from "../api";

export default function Tasks() {
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await client.api.tasks.$get();
      return await response.json();
    },
    select: (it) => it.tasks,
  });

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Failed to load tasks";
  }

  return <TaskList tasks={tasks} />;
}
