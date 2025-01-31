import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, deadline, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        deadline,
        status,
      },
    });

    res.status(201).json(newTask);
  } catch (e) {
    console.error('Error creating task:', e);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {

    const allTasks = await prisma.task.findMany();
    res.status(200).json(allTasks);
    
  } catch (e) {
    console.error('Error retrieving tasks:', e);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await prisma.task.delete({ where: { id: Number(id) } });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    console.error("Error deleting task:", e);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export default {
  createTask,
  getAllTasks,
  deleteTask
};
