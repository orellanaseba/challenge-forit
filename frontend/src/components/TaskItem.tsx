import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Task from "./Task";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const TaskItem = () => {
    const [task, setTask] = useState<Task | null>(null);
    const { id } = useParams();

    useEffect(() => {
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
    }, [])

    return (
        <main className="flex justify-center flex-col items-center relative">
            <Link to="/taskList" className="absolute top-2 left-5 font-semibold text-black underline">Volver</Link>
            <section className="w-[60%] flex flex-col items-center mt-4 gap-2">
                { task ?
                <section className="relative hover:border-zinc-300 hover:border bg-white border-zinc-200 border w-full h-96 rounded-xl flex flex-col items-center justify-start p-2 shadow-zinc-200 shadow gap-2">
                    <article className="w-full text-center flex justify-around items-center">
                        <span className={`font-semibold ${task.completed ? "underline text-green-400" : ""}`}>{ task.completed ? "Completado" : "No completado" } </span>
                        {task.title.length > 20 ? (
                            <p title={task.title} className="font-semibold text-2xl truncate">{task.title.length > 20 ? task.title.slice(0, 20) + "..." : task.title}</p>
                        ): 
                            <p className="font-semibold text-2xl">{task.title.length > 20 ? task.title.slice(0, 20) : task.title}</p>
                        }
                        <span className="font-semibold">{ task.createdAt }</span>
                    </article>
                    <hr className="w-full text-zinc-200" />
                    <article className="w-full h-full">
                        <p className="font-semibold">Descripción: { task.description }</p>
                    </article>
                </section>
                : <h1>No hay tarea para mostrar</h1>}
            </section>
        </main>
    )
}

export default TaskItem;