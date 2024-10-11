import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacosComponent {
  zodiacForm: FormGroup;
  zodiacSign: string = '';

  chineseZodiacSigns: string[] = [
    'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 
    'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
  ];

  constructor(private fb: FormBuilder) {
    this.zodiacForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dia: ['', Validators.required],
      mes: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    });
  }
  calcularZodiacoChino() {
    const anoNacimiento = this.zodiacForm.get('ano')?.value;
    if (anoNacimiento) {
      const index = (anoNacimiento - 4) % 12;
      this.zodiacSign = this.chineseZodiacSigns[index];
    }
  }
  onSubmit() {
    if (this.zodiacForm.valid) {
      this.calcularZodiacoChino();
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}

