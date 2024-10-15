import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { MainService, Task } from '../../service/main.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExportPdfService } from '../../service/export-pdf.service';

@Component({
  selector: 'app-body-notes',
  standalone: true,
  imports: [TaskComponent, CommonModule, FormsModule],
  templateUrl: './body-notes.component.html',
  styleUrl: './body-notes.component.scss'
})
export class BodyNotesComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private _taskService = inject(MainService);
  private _exportPdfService = inject(ExportPdfService);

  nameTask: string = '';

  lsTask: Task[] = [];

  taskEditing: Task | undefined;



  ngOnInit(): void {
    this._taskService.getAllTask()
      .pipe(
        tap(tasks => console.log(tasks)),
        takeUntil(this.destroy$))
      .subscribe(lsTask => {
        this.lsTask = lsTask
      })

    this._taskService.getTaskEditing()
      .pipe(
        takeUntil(this.destroy$),
        tap(task => console.log(task)))
      .subscribe(task => {
        this.taskEditing = task
        this.nameTask = task?.name || '';
      })


  }

  exportPdf() {
    this._exportPdfService.exportAsPDF();
  }

  addTask() {
    if (!this.nameTask.trim()) {
      return;
    }
    const task: Task = {
      id: Math.floor(Math.random() * 1000000).toString(),
      name: this.nameTask
    }
    this._taskService.addTask(task);
    this.resetForm();

  }

  updateTask() {
    if (this.taskEditing !== undefined) {
      const taskUpdate = { ...this.taskEditing, name: this.nameTask }
      this._taskService.editTask(taskUpdate);
      this.resetForm();
    }
  }

  resetForm() {
    this._taskService.setTaskEditing(undefined);
    this.nameTask = '' //clear input
  }

  onSubmit() {
    this.addTask()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
