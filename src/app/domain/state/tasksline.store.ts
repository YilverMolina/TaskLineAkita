import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Tasksline } from './tasksline.model';

export interface TaskslineState extends EntityState<Tasksline> {}

const initialState: Tasksline = {
    id: 'tasksline-empty',
    title: 'blank',
    color: '#e0e0e0',
    tasks: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tasksline' })
export class TaskslineStore extends EntityStore<TaskslineState, Tasksline> {

constructor() {
    super(initialState);
}

}
