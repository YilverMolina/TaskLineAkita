import { ID } from '@datorama/akita';

export interface Tasksline {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  id: string;
}

/**
* A factory function that creates Tasksline
*/
export function createTasksline({ id, title, color, tasks }: Partial<Tasksline>) {
  return {
    id,
    title,
    color,
    tasks
  } as Tasksline;
}