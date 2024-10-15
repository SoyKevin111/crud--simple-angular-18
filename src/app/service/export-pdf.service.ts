import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {
  

  exportAsPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Nombre', 'Edad', 'Ciudad']],
      body: [
        ['Juan', 30, 'Madrid'],
        ['Ana', 22, 'Barcelona'],
        ['Pedro', 35, 'Sevilla'],
      ],
    });

    // Guardar el PDF
    doc.save('documento.pdf');
  }

}
