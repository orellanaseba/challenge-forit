import { Router } from "express";
import { deleteTaskById, getTaskById, getTasks, postTask, putTask } from "../controllers/tasksController.js";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.post("/", postTask);
taskRouter.get("/:id", getTaskById);
taskRouter.delete("/:id", deleteTaskById);
taskRouter.put("/:id", putTask);

export default taskRouter;