import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface Task {
  id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class MainService {


  private taskSubject = new BehaviorSubject<Task[]>([
    { id: '1', name: 'tarea n1' },
    { id: '2', name: 'tarea n2' },
    { id: '3', name: 'tarea n3' },
  ]);
  private taskEditingSubject = new BehaviorSubject<Task | undefined>(undefined);

  $lsTasks: Observable<Task[]> = this.taskSubject.asObservable();
  $taskEditing: Observable<Task | undefined> = this.taskEditingSubject.asObservable();

  getTaskEditing(): Observable<Task | undefined> {
    return this.$taskEditing;
  }

  setTaskEditing(task: Task | undefined) {
    this.taskEditingSubject.next(task);
  }

  getAllTask(): Observable<Task[]> {
    return this.$lsTasks
  }

  addTask(newTask: Task) {
    const updateTasks = [...this.taskSubject.getValue(), newTask];
    this.taskSubject.next(updateTasks);
  }

  deleteTask(id: string) {
    const updateTasks = this.taskSubject.getValue().filter(task => task.id !== id)
    this.taskSubject.next(updateTasks)
  }

  editTask(updateTask: Task) {
    const updateTasks = this.taskSubject.getValue().map(
      task => task.id === updateTask.id ? updateTask : task
    )
    this.taskSubject.next(updateTasks);
  }

  getTaskById(id: string): Task | undefined {
    const task = this.taskSubject.getValue().find(task => task.id === id);
    return task;
  }

}
