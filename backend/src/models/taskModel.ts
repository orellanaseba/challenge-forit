export interface Task {
    id: string;
    title: string;
    done: boolean;
    createdAt: string;
}

export const tasks: Task[] = [
    {id: crypto.randomUUID(), title: "Soy ChiChe", done: false, createdAt: "2020-10-15"}
];
