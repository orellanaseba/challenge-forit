import { useState } from "react";
import Task from "../components/Task";
import tasksModel from "../model/taskModel";
import Modal from "../components/Modal";

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>(tasksModel);
    const [openTaskId, setOpenTaskId] = useState<string | null>(null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleToggleModal = () => {
        setIsOpenModal(prev => !prev);
    }

    const handleToggleDescription = (taskId: string) => {
        setOpenTaskId(prev => prev === taskId ? null : taskId);
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

            <section className="p-5 w-[60%] mt-4 flex justify-center gap-2 items-center min-h-20 bg-white rounded-lg border-zinc-200 border shadow-zinc-200 shadow">
                <Modal visible={isOpenModal} closeModal={handleToggleModal}/>
                <div onClick={handleToggleModal} className="p-2 text-sm flex justify-center h-10 w-full items-center border-zinc-200 border text-white rounded-xl bg-orange-500 font-semibold cursor-pointer hover:bg-orange-600">
                    <img className="w-4 h-4" src="/plus-icon.svg" alt="plus icon" />
                    <span className="ml-2">Agregar nueva tarea</span>
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