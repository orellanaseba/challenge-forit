interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    isOpen?: boolean;
    onOpenDescription?: (taskId: string) => void;
    handleToggleModal?: () => void;
    handleDeleteTask?: (id: Task["id"]) => void;
    taskToEdit?: (task: Task["id"]) => void;
}

const Task = ({ id, title, description, completed, createdAt, isOpen, onOpenDescription, handleToggleModal, handleDeleteTask, taskToEdit } : Task) => {

    return (
        <article id={id} className={`relative hover:border-zinc-300 hover:border bg-white border-zinc-200 border w-full rounded-xl flex flex-col items-center justify-between ${isOpen ? "min-h-32" : "min-h-16"} p-2 shadow-zinc-200 shadow`}>
            {/* Article para mostrar solo un preview */}
            <article className="w-full flex justify-between items-center min-h-12">
            <div className="w-52 flex items-center justify-start gap-2">
                <input type="checkbox" />
                { title && title.length > 20 ?  <span className="font-semibold truncate">{ title.slice(0, 25) }...</span> : <span className="font-semibold">{ title }</span>}
            </div>
            <div className="min-w-32 max-w-32 text-center">
                {description && description.length > 30 ? <p className="truncate font-semibold">{ description.slice(0, 30) }...</p> : <p className="font-semibold">{ description }</p>}
            </div>
            <div className="flex justify-around min-w-32">
                <span>{ completed }</span>
                <span className="font-semibold">{ createdAt } </span>
            </div>

            <div className={`flex justify-around items-center`}>
                <img onClick={() => onOpenDescription?.(id)} className={`${isOpen ? "rotate-180" : ""} cursor-pointer w-4 h-5 absolute top-1 right-3`} src="/chevron-top.png" alt="chevron icon" />
            </div>
            </article>

            <hr className={`${isOpen ? "flex" : "hidden"} w-full text-zinc-200 mb-2`} />

            <div className={`${isOpen ? "flex" : "hidden"} flex justify-between w-full min-h-12`}>
                <div className="w-[90%]">
                    <p className="font-semibold text-sm">Descripción: { description } </p>
                </div>

                <div className="flex items-center justify-around w-[10%]">
                    <img onClick={() => {taskToEdit?.(id); handleToggleModal?.()}} title="Editar" className="cursor-pointer w-5 h-5" src="/edit-icon.png" alt="edit icon" />
                    <img onClick={() => handleDeleteTask?.(id)} title="Eliminar" className="cursor-pointer w-5 h-5" src="/trash-icon.svg" alt="delete icon" />
                </div>
            </div>

            
        </article>
    )
}

export default Task;