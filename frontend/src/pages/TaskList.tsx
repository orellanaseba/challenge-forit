import { useEffect, useState } from "react";
import Task from "../components/Task";
import { Link } from "react-router-dom";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);
    const [taskCounter, setTaskCounter] = useState(0);

    const deleteTask = async (id: Task["id"]) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/tasks/${id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            });

            if(!res.ok) {
                console.log("Erorr al eliminar la tarea.");
            }

            setTasks(prev => prev.filter(task => task.id !== id));

            console.log({ message: "Tarea eliminada correctamente.", id})
        }
        catch(err) {
            console.log("Error al eliminar la tarea: ", err);
        }
    }

    const handleToggleDescription = (taskId: string) => {
        setOpenTaskId(prev => prev === taskId ? null : taskId);
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/api/tasks`)
                if(!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }

                const data : Task[] = await res.json();
                setTasks(data);
            }
            catch(err) {
                console.error("Error al obtener las tareas:", err);
            }
        }

        fetchTasks();
    }, [])

    useEffect(() => {
        const completedCount = tasks.filter(t => t.completed).length;
        setTaskCounter(completedCount);
    }, [tasks])

    const handleTaskCounter = async (id: Task["id"], checked: boolean) => {

        try {
            const res = await fetch(`${VITE_API_URL}/api/tasks/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ completed: checked })
            })

            if(!res.ok) {
                throw new Error("Error al actualizar la tarea");
            }

            console.log({message: "Tarea actualizada correctamente"});

        }
        catch(err) {
            console.error("Error al actualizar la tarea:", err);
        }

        setTaskCounter(prev => prev + ( checked ? 1 : -1));
    }

    return (
        <main className="flex justify-center flex-col items-center">
            <section className="w-[80%] md:w-[60%] flex flex-col items-center mt-4 gap-2">
                {/* Logo diseño */}
                <div className="relative w-60 flex justify-center">
                    <div className="bg-orange-500 w-5 h-5 absolute right-0 rounded-full">
                    </div>
                    <h1 className="text-5xl font-bold text-black">Task<span className="underline">App</span></h1>
                </div>
                <span className="text-zinc-600 text-center">Organiza tu día de manera simple y efectiva</span>
            </section>

            <section className="p-5 w-[80%] md:w-[60%] mt-4 flex justify-center gap-2 items-center min-h-20 bg-white rounded-lg border-zinc-200 border shadow-zinc-200 shadow">
                
                <Link className="w-full" to={`/taskForm/create/`}>
                    <div className="p-2 text-sm flex justify-center h-10 w-full items-center border-zinc-200 border text-white rounded-xl bg-orange-500 font-semibold cursor-pointer hover:bg-orange-600">
                        <img className="w-4 h-4" src="/plus-icon.svg" alt="plus icon" />
                        <span className="ml-2">Agregar nueva tarea</span>
                    </div>
                </Link>

            </section>

            <section className={`${tasks.length == 0 ? "w-[80%] md:w-[60%] min-h-72 max-h-72 mt-6 bg-white rounded-xl flex flex-col items-center justify-center border-zinc-200 border shadow-zinc-200 shadow gap-2" : `w-[80%] md:w-[60%] min-h-80 max-h-72 mt-6 rounded-xl flex flex-col items-center justify-start gap-2 ${tasks.length > 5 ? "overflow-y-scroll" : ""}`} `}>
                {tasks.length > 0 ? (
                    <section className="w-full flex justify-between">
                    <span className="font-semibold">Tareas completadas {taskCounter} de {tasks.length}</span>
                </section>
                ) : null}
                {tasks.length == 0 ? (
                    <>
                    <img className="bg-orange-500 border-zinc-300 border rounded-full p-2 w-12 h-12" src="/check-icon.svg" alt="check icon" />
                    <span className="text-xl font-semibold">No hay tareas</span>
                    <span className="opacity-50 text-sm text-center">Comienza agregando tu primera tarea</span>
                    </>
                ) : (
                    tasks.map(t => (
                        <Task
                            key={t.id}
                            id={t.id} 
                            title={t.title}
                            description={t.description}
                            completed={t.completed}
                            createdAt={t.createdAt}
                            isOpen={openTaskId === t.id}
                            onOpenDescription={handleToggleDescription}
                            handleDeleteTask={deleteTask}
                            handleTaskCounter={handleTaskCounter}
                        />
                    ))
                )}
            </section>
        </main>
    )
}

export default TaskList;