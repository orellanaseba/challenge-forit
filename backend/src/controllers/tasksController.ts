import type { Request, Response } from "express";
import { tasks } from "../models/taskModel.js";

export const getTasks = (req: Request, res: Response) => {
    const data = res.json(tasks);
    return data;
}

export const postTask = (req: Request, res: Response) => {
    const { id, title, done, createdAt } = req.body;
    tasks.push({id, title, done, createdAt})
    res.json({message: "Tarea creada correctamente."});
}

export const getTaskById = (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("ID DE LA TAREA: " + id);
    const task = tasks.find(taskId => taskId.id == id);

    console.log(task);
    res.json(task);  
}

export const deleteTaskById = (req: Request, res: Response) => {
    const { id } = req.params;

    const task = tasks.findIndex(task => task.id === id);
    
    // Eliminar tarea mediante índice
    tasks.splice(task, 1);
    res.json({message: "Tarea eliminada correctamente"})
}

export const putTask = (req: Request, res: Response) => {
    // modificar solo la tarea que queremos
    const { id } = req.params;
    const update = req.body;

    const task = tasks.map(task => task.id === id ? {...tasks, ...update} : task);

    console.log(task);

}