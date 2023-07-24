import styled, { css } from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, client } from "../api";

interface Props {
  task: Task;
}

export default function ActiveTask({ task }: Props) {
  const queryClient = useQueryClient();

  const { mutate: handleComplete, isLoading } = useMutation(
    async () => {
      await client.api.tasks[":taskId"].$post({
        param: { taskId: task.id },
      });
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
    }
  );

  return (
    <Active onClick={() => handleComplete()} isLoading={isLoading}>
      {task.title}
    </Active>
  );
}

const Active = styled.div<{ isLoading: boolean }>`
  font-weight: bold;

  ${(props) =>
    props.isLoading &&
    css`
      color: gray;
    `}
`;
