import { Component, OnInit } from '@angular/core';
import { Task } from './shared/taskline.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskslineService } from './domain/state/tasksline.service';
import { Tasksline } from './domain/state/tasksline.model';
import { Observable } from 'rxjs';
import { TaskslineQuery } from './domain/state/tasksline.query';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public tasksline: Tasksline[];
    public taskslines$: Observable<Tasksline[]>;
    public showModal = false;
    public showAddTask = false;
    public newTasksline: Tasksline;
    public newTask: Task;
    public selectedTasksline: Tasksline;

    constructor(private _http: HttpClient,
        private _taskslineService: TaskslineService,
        private _tasklineQuery: TaskslineQuery) {
        this.tasksline = [];
        this.newTasksline = {
            id: '',
            title: '',
            color: '',
            tasks: []
        };

        this.newTask = {
            id: '',
            title: '',
            description: ''
        };

    }

    ngOnInit() {
        this.taskslines$ = this._tasklineQuery.selectAll();
        this.taskslines$.subscribe((data: Tasksline[]) => {
            this.tasksline = data;
        });
    }

    get taskslineIds(): string[] {
        return this.tasksline.map(item => item.id);
    }

    public getTaskslineData(tasks: Task[]): Task[] {
        return [...tasks];
    }

    onTaskDrop(event: CdkDragDrop<Task[]>) {
        // In case the destination container is different from the previous container, we
        // need to transfer the given task to the target data array. This happens if
        // a task has been dropped on a different block.
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);

            let taskLinePrevious: Tasksline = Object.assign({}, this._tasklineQuery.getEntity(event.previousContainer.id));
            let taskLineTarget: Tasksline = Object.assign({}, this._tasklineQuery.getEntity(event.container.id));

            let taskIndex = taskLinePrevious.tasks.findIndex(task => task.id === event.container.data[event.container.data.length - 1].id);
            let taskDropped: Task = taskLinePrevious.tasks[taskIndex];

            let misPreviousTasks = [...taskLinePrevious.tasks];
            let misTargetTasks = [...taskLineTarget.tasks];

            misPreviousTasks.splice(taskIndex, 1);
            misTargetTasks.push(taskDropped);

            taskLinePrevious.tasks = misPreviousTasks;
            taskLineTarget.tasks = misTargetTasks;

            this._taskslineService.update(taskLinePrevious.id, taskLinePrevious);
            this._taskslineService.update(taskLineTarget.id, taskLineTarget);
        }


    }

    onTaskslineDrop(event: CdkDragDrop<Tasksline[]>) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    public saveTasksline() {
        this._taskslineService.add(this.newTasksline);
        this.newTasksline = {
            id: '',
            title: '',
            color: '',
            tasks: []
        };
        this.showModal = false;
    }
    public setSelected(selected: Tasksline) {
        this.selectedTasksline = selected;
        this.showAddTask = true;
    }
    public async saveNewTask() {
        if (this.selectedTasksline) {
            let newTasksline = Object.assign({}, this.selectedTasksline);
            newTasksline.tasks = [...this.selectedTasksline.tasks];
            newTasksline.tasks.push(this.newTask);
            this._taskslineService.update(newTasksline.id, newTasksline);
            this.newTask = {
                id: '',
                title: '',
                description: ''
            };
        }
        this.showAddTask = false;
    }
}