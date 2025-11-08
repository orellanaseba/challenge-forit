import type { Request, Response } from "express";
import { tasks } from "../models/taskModel.js";

export const getTasks = (req: Request, res: Response) => {
    const data = res.json(tasks);
    return data;
}

export const postTask = (req: Request, res: Response) => {
    const { id, title, description, completed, createdAt } = req.body;
    tasks.push({id, title, description, completed, createdAt})
    console.log("TAREAS CREADAS", tasks);
    res.json({message: "Tarea creada correctamente."});
}

export const getTaskById = (req: Request, res: Response) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id == id);

    console.log(task);
    res.json(task);  
}

export const deleteTaskById = (req: Request, res: Response) => {
    const { id } = req.params;

    const task = tasks.findIndex(task => task.id == id);
    
    // Eliminar tarea mediante índice
    tasks.splice(task, 1);
    res.json({message: "Tarea eliminada correctamente"})
    console.log(task);
}

export const putTask = (req: Request, res: Response) => {
    // modificar solo la tarea que queremos
    const { id } = req.params;
    const update = req.body;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if(taskIndex === -1) {
        return res.status(404).json({message: "Tarea no encontrada"});
    }

    tasks[taskIndex] = {...tasks[taskIndex], ...update};
    console.log(tasks[taskIndex]);

    res.json(tasks[taskIndex]);

}