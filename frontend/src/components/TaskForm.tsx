import { useEffect, useState } from "react";
import type Task from "./Task";
import { Link, useNavigate, useParams } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;

interface TaskFormProps {
    handleCreateTask?: (newTask: Task) => void;
    handleEditTask?: (task: Task) => void;
}

const TaskForm = ({ handleCreateTask } : TaskFormProps) => {
    const [task, setTask] = useState<Task | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return;

        const fetchTask = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/api/tasks/${id}`)

                if(!res.ok) {
                    throw new Error("Error al obtener la tarea.");
                }

                const data : Task = await res.json();

                setTask(data);

            }
            catch(err) {
                console.error("Error al obtener la tarea.");
            }
        }
        fetchTask();

    }, [id])

    const handleEditTask = async (task: Task) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/tasks/${task.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(task)
            })

            if(!res.ok) {
                throw new Error("Error al actualizar la tarea.");
            }
        
            console.log({message: "Tarea actualizada correctamente."})

        }
        catch(err) {
            console.error("Error al actualizar la tarea:", err);
        }
    }

    const [formData, setFormData] = useState<Task>({
        id: task?.id || crypto.randomUUID(),
        title: task?.title || "",
        description: task?.description || "",
        completed: task?.completed || false,
        createdAt: task?.createdAt || "",
    });

    // Cambia el modo de creación y edición de tareas.
    useEffect(() => {
        setFormData({
            id: task?.id || crypto.randomUUID(),
            title: task?.title || "",
            description: task?.description || "",
            completed: task?.completed || false,
            createdAt: task?.createdAt || "",
        })
    }, [task])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            if(task) {
                handleEditTask?.(formData);
                navigate("/");
            }
            else {
                const res = await fetch(`${VITE_API_URL}/api/tasks`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                })

                const data = await res.json();

                console.log(data);

                handleCreateTask?.(formData);
                navigate("/");
            }
        }
        catch(err) {
            console.error("Error en el servidor:", err);
        }  
    }

    return (
        <main className="flex justify-center flex-col items-center">
            <Link to="/" className="absolute top-2 left-2 font-semibold underline">Volver</Link>
            <div className={`flex flex-col items-start absolute top-13 w-[90%] md:w-[50%] z-10 mt-5 h-[70%] rounded-xl p-5 bg-white shadow-zinc-300 shadow`}>
                <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-xl">{task ? "Editar tarea" : "Nueva tarea"}</span>
                    <Link to={"/"}>
                        <img className="w-5 h-5 cursor-pointer" src="/x-icon.png" alt="" />
                    </Link>
                </div>
                <hr className="w-full text-zinc-100 mt-2" />

                <form method="post" onSubmit={handleSubmit} className="flex flex-col justify-evenly mt-2 w-full h-full gap-2">
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="title">Título *</label>
                        <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="text-sm focus:outline-zinc-300 rounded-xl p-2 bg-white border-zinc-300 border" name="title" id="title" type="text" placeholder="¿Qué necesitas hacer?" maxLength={35} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="description">Descripción</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="resize-none text-sm focus:outline-zinc-300 rounded-xl p-2 bg-white border-zinc-300 border" maxLength={120} name="description" id="description" placeholder="Agrega más detalles..."></textarea>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="createdAt">Fecha de entrega</label>
                        <input value={formData.createdAt} onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })} name="createdAt" id="createdAt" className="text-sm focus:outline-zinc-300 rounded-xl p-2 bg-white border-zinc-300 border" type="date" />
                    </div>

                    <hr className="text-zinc-100 w-full" />

                    <div className="w-full flex justify-end gap-3 items-center mt-3">
                        <Link to={"/"}>
                            <button type="button" className="p-2 cursor-pointer hover:bg-zinc-200 bg-zinc-100 font-semibold rounded-xl border-zinc-300 border">Cancelar</button>
                        </Link>
                        <button type="submit" className="p-2 cursor-pointer hover:bg-orange-600 bg-orange-500 text-white font-semibold rounded-xl border-zinc-300 border">{ task ? "Guardar cambios" : "Crear tarea" }</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default TaskForm;