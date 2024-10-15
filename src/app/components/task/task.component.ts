import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MainService, Task } from '../../service/main.service';
import { ExportPdfService } from '../../service/export-pdf.service';

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
  private _pdfService = inject(ExportPdfService);



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

  exportPdf(){
    this._pdfService.exportAsPDF();
  }




}
