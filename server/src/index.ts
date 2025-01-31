import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import TodolistRouter from "./routes/todolist.route";

import { PrismaClient } from '@prisma/client';

import cors from "cors";

const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {
  app.use(express.json());

  app.use(cors());
  
  app.use("/api/v1", TodolistRouter);

  
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error("Error is",e);
    await prisma.$disconnect();
    process.exit(1);
  });