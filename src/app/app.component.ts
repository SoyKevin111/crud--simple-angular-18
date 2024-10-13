import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BodyNotesComponent } from './components/body-notes/body-notes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BodyNotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'observables-practica';
}
