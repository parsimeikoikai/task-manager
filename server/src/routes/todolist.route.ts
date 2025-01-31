import express from "express";
import TodolistController from "../controllers/todolist.controller";

const router = express.Router();

router.post("/createTask", TodolistController.createTask);
router.get("/getall", TodolistController.getAllTasks);
router.delete("/deleteTask/:id", TodolistController.deleteTask);

export default router;