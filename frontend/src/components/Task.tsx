import { useState } from "react";
import { Link } from "react-router-dom";

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    isOpen?: boolean;
    onOpenDescription?: (taskId: string) => void;
    handleDeleteTask?: (id: Task["id"]) => void;
    handleTaskCounter?: (id: Task["id"], checked: boolean) => void;
}

const Task = ({ id, title, description, completed, createdAt, isOpen, onOpenDescription, handleDeleteTask, handleTaskCounter } : Task) => {

    const [isCompleted, setIsCompleted] = useState(completed);

    const handleTaskCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(e.target.checked);
        handleTaskCounter?.(id, e.target.checked);
    }

    return (
        <article id={id} className={`${isCompleted ? "bg-zinc-100" : "bg-white"} relative hover:border-zinc-300 hover:border border-zinc-200 border w-full rounded-xl flex flex-col items-center justify-between ${isOpen ? "min-h-32" : "min-h-16"} p-2 shadow-zinc-200 shadow`}>
            {/* Article para mostrar solo un preview */}
            <article className="w-full flex justify-between items-center min-h-12">
            <div className="w-52 flex items-center justify-start gap-2">
                <input name="completed" checked={isCompleted} onChange={handleTaskCompleted} type="checkbox" />
                <Link className={`${isCompleted ? "line-through" : "text-blue-700 underline"}`} to={`/taskItem/${id}`}>
                    { title && title.length > 20 ?  <span className="font-semibold truncate text-sm">{ title.slice(0, 25) }...</span> : <span className="font-semibold text-sm">{ title }</span>}
                </Link>
            </div>
            <div className="min-w-56 max-w-60 md:min-w-64 text-center text-sm">
                {description && description.length > 30 ? <p className="truncate font-normal">{ description.slice(0, 30) }...</p> : <p className="font-normal">{ description }</p>}
            </div>
            <div className="flex items-center justify-between min-w-32">
                <span>{ completed }</span>
                <span className="font-semibold hidden md:block">{ createdAt } </span>
            </div>

            <div className={`flex justify-around items-center`}>
                <img onClick={() => onOpenDescription?.(id)} className={`${isOpen ? "rotate-180" : ""} cursor-pointer w-4 h-5 absolute top-1 right-3`} src="/chevron-top.png" alt="chevron icon" />
            </div>
            </article>

            <hr className={`${isOpen ? "flex" : "hidden"} w-full text-zinc-200 mb-2`} />

            <div className={`${isOpen ? "flex" : "hidden"} flex justify-between w-full min-h-12`}>
                <div className="w-[90%]">
                    {description && description.length > 30 ? <p className="truncate font-normal text-sm">{ description.slice(0, 30) }...</p> : <p className="font-normal text-sm">{ description }</p>}
                </div>

                <div className="flex items-center justify-around w-[10%] flex-col md:flex-row">
                    <Link to={`/taskForm/edit/${id}`}>
                        <img title="Editar" className="cursor-pointer w-5 h-5" src="/edit-icon.png" alt="edit icon" />
                    </Link>
                    <img onClick={() => handleDeleteTask?.(id)} title="Eliminar" className="cursor-pointer w-5 h-5" src="/trash-icon.svg" alt="delete icon" />
                </div>
            </div>

            
        </article>
    )
}

export default Task;