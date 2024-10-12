import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZodiacosComponent } from './formulario/zodiaco/zodiaco.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ZodiacosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
