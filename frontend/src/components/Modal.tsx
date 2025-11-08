import { useEffect, useState } from "react";
import type Task from "./Task";

interface ModalProps {
    visible: boolean;
    closeModal?: () => void;
    handleCreateTask?: (newTask: Task) => void;
    taskToEdit?: Task | null;
    handleEditTask?: (task: Task) => void;
}

const Modal = ({ visible, closeModal, handleCreateTask, taskToEdit, handleEditTask } : ModalProps) => {

    const [formData, setFormData] = useState<Task>({
        id: taskToEdit?.id || crypto.randomUUID(),
        title: taskToEdit?.title || "",
        description: taskToEdit?.description || "",
        completed: taskToEdit?.completed || false,
        createdAt: taskToEdit?.createdAt || "",
    });

    // Cambia el modo de creación y edición de tareas.
    useEffect(() => {
        setFormData({
            id: taskToEdit?.id || crypto.randomUUID(),
            title: taskToEdit?.title || "",
            description: taskToEdit?.description || "",
            completed: taskToEdit?.completed || false,
            createdAt: taskToEdit?.createdAt || "",
        })
    }, [taskToEdit])

    if(!visible) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            if(taskToEdit) {
                handleEditTask?.(formData);
            }
            else {
                const res = await fetch("http://localhost:3000/api/tasks", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(formData)
                })

                const data = await res.json();

                console.log(data);

                handleCreateTask?.(formData)
                closeModal?.();
            }
        }
        catch(err) {
            console.error("Error en el servidor:", err);
        }  
    }

    return (
        <div className={`${visible ? "flex" : "hidden"} flex flex-col items-start absolute top-13 w-[35%] z-10 mt-5 h-[70%] rounded-xl p-5 bg-white shadow-zinc-300 shadow`}>
            <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xl">{taskToEdit ? "Editar tarea" : "Nueva tarea"}</span>
                <img onClick={closeModal} className="w-5 h-5 cursor-pointer" src="/x-icon.png" alt="" />
            </div>
            <hr className="w-full text-zinc-100 mt-2" />

            <form method="post" onSubmit={handleSubmit} className="flex flex-col justify-evenly mt-2 w-full h-full gap-2">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold" htmlFor="title">Título *</label>
                    <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="text-sm focus:outline-zinc-300 rounded-xl p-2 bg-white border-zinc-300 border" name="title" id="title" type="text" placeholder="¿Qué necesitas hacer?" />
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
                    <button type="button" onClick={closeModal} className="p-2 cursor-pointer hover:bg-zinc-200 bg-zinc-100 font-semibold rounded-xl border-zinc-300 border">Cancelar</button>
                    <button type="submit" className="p-2 cursor-pointer hover:bg-orange-600 bg-orange-500 text-white font-semibold rounded-xl border-zinc-300 border">{ taskToEdit ? "Guardar cambios" : "Crear tarea" }</button>
                </div>
            </form>
        </div>
    )
}

export default Modal;