import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { TaskslineStore } from './tasksline.store';
import { Tasksline } from './tasksline.model';

@Injectable({ providedIn: 'root' })
export class TaskslineService {

  constructor(private taskslineStore: TaskslineStore,
    private http: HttpClient) {
  }

  get() {
    this.http.get('https://akita.com').subscribe((entities) => this.taskslineStore.set(entities));
  }

  add(tasksline: Tasksline) {
    this.taskslineStore.add(tasksline);
  }

  update(id, tasksline: Partial<Tasksline>) {
    this.taskslineStore.update(id, tasksline);
  }

  remove(id: ID) {
    this.taskslineStore.remove(id);
  }
}
