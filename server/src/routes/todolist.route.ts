import express from "express";
import TodolistController from "../controllers/todolist.controller";

const router = express.Router();

router.post("/tasks", TodolistController.createTask); 
router.get("/tasks", TodolistController.getAllTasks);  
router.delete("/tasks/:id", TodolistController.deleteTask); 

export default router;