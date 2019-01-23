import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TaskslineStore, TaskslineState } from './tasksline.store';
import { Tasksline } from './tasksline.model';

@Injectable({
  providedIn: 'root'
})
export class TaskslineQuery extends QueryEntity<TaskslineState, Tasksline> {


  
  constructor(protected store: TaskslineStore) {
    super(store);
  }

}
