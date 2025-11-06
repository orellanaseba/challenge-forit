interface ModalProps {
    visible: boolean;
    closeModal?: () => void;
}

import tasksModel from "../model/taskModel";


const Modal = ({ visible, closeModal } : ModalProps) => {
    if(!visible) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const createdAt = formData.get("createdAt") as string;

        const newTask = {
            id: crypto.randomUUID(),
            title,
            description,
            createdAt,
            completed: false
        };

        tasksModel.push(newTask);
    }

    return (
        <div className={`${visible ? "flex" : "hidden"} flex flex-col items-start absolute top-13 w-[35%] z-10 mt-5 h-[70%] rounded-xl p-5 bg-white shadow-zinc-300 shadow`}>
            <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-xl">Nueva tarea</span>
                <img onClick={closeModal} className="w-5 h-5 cursor-pointer" src="/x-icon.png" alt="" />
            </div>
            <hr className="w-full text-zinc-100 mt-2" />

            <form method="post" onSubmit={handleSubmit} className="flex flex-col justify-evenly mt-2 w-full h-full gap-2">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold" htmlFor="title">Título *</label>
                    <input required className="text-sm focus:outline-zinc-300 rounded-xl p-2 bg-white border-zinc-300 border" name="title" id="title" type="text" placeholder="¿Qué necesitas hacer?" />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-semibold" htmlFor="description">Descripción</label>
                    <textarea className="resize-none text-sm focus:outline-zinc-300 rounded-xl p-2 bg-white border-zinc-300 border" name="description" id="description" placeholder="Agrega más detalles..."></textarea>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-semibold" htmlFor="createdAt">Fecha de entrega</label>
                    <input name="createdAt" id="createdAt" className="text-sm focus:outline-zinc-300 rounded-xl p-2 bg-white border-zinc-300 border" type="date" />
                </div>
                
                <hr className="text-zinc-100 w-full" />

                <div className="w-full flex justify-end gap-3 items-center mt-3">
                    <button type="button" onClick={closeModal} className="p-2 cursor-pointer hover:bg-zinc-200 bg-zinc-100 font-semibold rounded-xl border-zinc-300 border">Cancelar</button>
                    <button type="submit" className="p-2 cursor-pointer hover:bg-orange-600 bg-orange-500 text-white font-semibold rounded-xl border-zinc-300 border">Crear tarea</button>
                </div>
            </form>
        </div>
    )
}

export default Modal;