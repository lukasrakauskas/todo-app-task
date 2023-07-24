import { Timestamp } from "firebase-admin/firestore";
import { db } from "./firebase";
import z from "zod";

export const createTaskSchema = z.object({
  title: z.string(),
});

export const taskSchema = createTaskSchema.extend({
  done: z.boolean(),
  createdAt: z.coerce.date(),
});

export type CreateTask = z.infer<typeof createTaskSchema>;
export type Task = z.infer<typeof taskSchema>;

const tasksRef = db.collection("tasks").withConverter<Task>({
  toFirestore: (data: Task) => ({
    ...data,
    createdAt: data.createdAt.toISOString(),
  }),
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const createdAt =
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : data.createdAt;

    return taskSchema.parse({ ...data, createdAt: createdAt });
  },
});

export async function getTasks() {
  const tasks = await tasksRef.orderBy("createdAt", "desc").get();
  return tasks.docs.map((it) => ({ id: it.id, ...it.data() }));
}

export async function completeTask(taskId: string) {
  await tasksRef.doc(taskId).update({ done: true });
}

export async function createTask(task: CreateTask) {
  const taskRef = await tasksRef.add({
    ...task,
    done: false,
    createdAt: new Date(),
  });
  const taskDoc = await taskRef.get();

  const data = taskDoc.data();

  if (!data) {
    throw new Error("Task not found");
  }

  return { id: taskDoc.id, ...data };
}
