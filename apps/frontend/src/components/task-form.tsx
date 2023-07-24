import { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTask, client } from "../api";

export default function TaskForm() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { mutate: addTask, isLoading } = useMutation(
    async (task: CreateTask) => {
      const response = await client.api.tasks.$post({ form: task });
      const data = await response.json();
      return data.task;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        setTitle("");
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask({ title });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset disabled={isLoading}>
        <input
          name="title"
          placeholder="Task"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit">Add Task</button>
      </fieldset>
    </Form>
  );
}

const Form = styled.form`
  margin: 16px 0;

  & fieldset {
    border: none;
  }

  & fieldset:disabled {
    opacity: 0.8;
  }
`;
