import { hc, InferRequestType, InferResponseType } from "hono/client";
import { AppType } from "backend/src/index";

export const client = hc<AppType>(
  process.env.REACT_APP_API_HOST ?? "http://localhost:4000"
);

export type CreateTask = InferRequestType<
  typeof client.api.tasks.$post
>["form"];
export type Task = NonNullable<
  InferResponseType<typeof client.api.tasks.$post>["task"]
>;
