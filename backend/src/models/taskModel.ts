export interface TaskItem {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
}

export const tasks: TaskItem[] = [];
