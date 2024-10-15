import { inject, Injectable, OnDestroy } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MainService, Task } from './main.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService implements OnDestroy {

  private destroy$ = new Subject<void>();
  private _mainService = inject(MainService);

  Tasks: Task[] = [];

  constructor() {
    this._mainService.getAllTask()
      .pipe(takeUntil(this.destroy$), tap())
      .subscribe(taskList => {
        this.Tasks = taskList;
      })
  }

  exportAsPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40, 50, 120);
    doc.text('Reporte de Tareas', 105, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text('Lista de tareas registradas', 70, 30, { align: 'right' });

    doc.setFillColor(240, 240, 240);
    doc.rect(10, 40, 190, 250, 'F');

    const head = [['No', 'Name']];
    const body = this.Tasks.map((task, index) => [index + 1, task.name]);

    autoTable(doc, {
      head: head,
      body: body,
      startY: 50,
      theme: 'striped',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        textColor: [40, 40, 40],
      },
    });

    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
