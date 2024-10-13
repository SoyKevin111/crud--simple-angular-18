import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MainService, Task } from '../../service/main.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  @Input() task: Task | undefined;
  private _taskService = inject(MainService);



  deleteTask() {
    if (this.task) {
      this._taskService.deleteTask(this.task.id);
    }
  }

  editNoti() {
    if (this.task) {
      this._taskService.setTaskEditing(this.task);
    }
  }




}
