export interface Taskline {
    title: string;
    id: string;
    color: string;
    tasks: Task[];
}

export interface Task {
    title: string;
    description: string;
    id: string;
}