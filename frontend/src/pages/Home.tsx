import { useState } from "react";
import Task from "../components/Task";
import tasksModel from "../model/taskModel";

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>(tasksModel);
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");

    const handleToggleDescription = (taskId: string) => {
        setOpenTaskId(prev => prev === taskId ? null : taskId);
    }

    const addNewTask = () => {
        setTasks(prev => [
        ...prev,
        {id: "20", title: inputValue, description: "Soy chiche", completed: false, createdAt: new Date()},
    ])

    console.log(tasks);
    }
    

    return (
        <main className="flex justify-center flex-col items-center">
            <section className="w-[60%] flex flex-col items-center mt-4 gap-2">
                {/* Logo diseño */}
                <div className="relative w-60 flex justify-center">
                    <div className="bg-orange-500 w-5 h-5 absolute right-0 rounded-full">
                    </div>
                    <h1 className="text-5xl font-bold text-black">Task<span className="underline">App</span></h1>
                </div>
                <span className="text-zinc-600">Organiza tu día de manera simple y efectiva</span>
            </section>

            <section className="w-[60%] mt-4 flex justify-center gap-2 items-center min-h-20 bg-zinc-100 rounded-lg border-zinc-200 border shadow-zinc-200 shadow">
                <input onChange={(e) => setInputValue(e.target.value)} className="p-2 border-zinc-200 border focus:outline-1 focus:outline-zinc-300 w-[80%] placeholder:text-sm text-black text-sm bg-white rounded-xl" type="text" placeholder="Agregar nueva tarea..." />
                <div onClick={addNewTask} className="p-2 text-sm flex justify-between w-24 items-center border-zinc-200 border text-white rounded-xl bg-orange-500 font-semibold cursor-pointer hover:bg-orange-600">
                    <img className="w-4 h-4" src="/plus-icon.svg" alt="plus icon" />
                    Agregar
                </div>
            </section>

            <section className={`${tasks.length == 0 ? "w-[60%] min-h-72 max-h-72 mt-6 bg-zinc-100 rounded-xl flex flex-col items-center justify-center border-zinc-200 border shadow-zinc-200 shadow gap-2" : `w-[60%] min-h-80 max-h-72 mt-6 rounded-xl flex flex-col items-center justify-start gap-2 ${tasks.length > 5 ? "overflow-y-scroll" : ""}`} `}>
                {tasks.length == 0 ? (
                    <>
                    <img className="bg-orange-500 border-zinc-300 border rounded-full p-2 w-12 h-12" src="/check-icon.svg" alt="check icon" />
                    <span className="text-xl font-semibold">No hay tareas</span>
                    <span className="opacity-50 text-sm">Comienza agregando tu primera tarea</span>
                    </>
                ) : (
                    tasks.map((t, i) => (
                        <Task
                            key={i}
                            id={t.id} 
                            title={t.title}
                            description={t.description}
                            completed={t.completed}
                            createdAt={t.createdAt}
                            isOpen={openTaskId === t.id}
                            onOpenDescription={handleToggleDescription}
                            
                        />
                    ))
                )}
            </section>
        </main>
    )
}

export default Home;