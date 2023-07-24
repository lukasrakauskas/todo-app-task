import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { completeTask, createTask, createTaskSchema, getTasks } from "./tasks";
import { zValidator } from "@hono/zod-validator";

import "dotenv/config";

import { z } from "zod";

const port = z.coerce.number().optional().parse(process.env.PORT) ?? 4000;

const app = new Hono();

if (process.env.NODE_ENV === "development") {
  app.use("*", logger());
}

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/tasks", async (c) => {
  const tasks = await getTasks();
  return c.json({ tasks });
});

app.post("/tasks", zValidator("form", createTaskSchema), async (c) => {
  const formData = c.req.valid("form");
  const task = await createTask(formData);
  return c.json({ task }, 201);
});

app.post("/tasks/:taskId", async (c) => {
  const { taskId } = c.req.param();
  await completeTask(taskId);
  return c.body(null, 204);
});

serve({ fetch: app.fetch, port });
