import { db } from "./firebase";
import z from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
});

export const taskSchema = createTaskSchema.extend({
  done: z.boolean(),
});

export type CreateTask = z.infer<typeof createTaskSchema>;
export type Task = z.infer<typeof taskSchema>;

const tasksRef = db.collection("tasks").withConverter<Task>({
  toFirestore: (data) => data,
  fromFirestore: (snapshot) => {
    return { id: snapshot.id, ...taskSchema.parse(snapshot.data()) };
  },
});

export async function getTasks() {
  const tasks = await tasksRef.get();
  return tasks.docs.map((it) => it.data());
}

export async function completeTask(taskId: string) {
  await tasksRef.doc(taskId).update({ done: true });
}

export async function createTask(task: CreateTask) {
  const taskRef = await tasksRef.add({ ...task, done: false });
  const taskDoc = await taskRef.get();
  return taskDoc.data();
}
