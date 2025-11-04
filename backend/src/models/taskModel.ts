export interface Task {
    id: string;
    title: string;
    done: boolean;
}

export const tasks: Task[] = [
    {id: crypto.randomUUID(), title: "Aprender Express.js", done: false},
    {id: crypto.randomUUID(), title: "Estudiar 2 horas", done: true},
    {id: crypto.randomUUID(), title: "Ir al gimnasio", done: false},
    {id: crypto.randomUUID(), title: "Preparar la cena", done: false},
];
