import { Request, Response } from "express";
import { PrismaClient, Task, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateTaskInput {
  title: string;
  description: string;
  deadline: Date;
  status: TaskStatus;
}

const createTask = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response
) => {
  try {
    const { title, description, deadline, status } = req.body;

    const newTask: Task = await prisma.task.create({
      data: {
        title,
        description,
        deadline,
        status,
      },
    });

    res.status(201).json(newTask);
  } catch (e) {
    console.error("Error creating task:", e);
    res.status(500).json({ error: "Failed to create task" });
  }
};

const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const allTasks: Task[] = await prisma.task.findMany();
    res.status(200).json(allTasks);
  } catch (e) {
    console.error("Error retrieving tasks:", e);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

const deleteTask = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const taskId = Number(id);

    if (isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const deletedTask: Task = await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (e) {
    console.error("Error deleting task:", e);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export default {
  createTask,
  getAllTasks,
  deleteTask,
};
