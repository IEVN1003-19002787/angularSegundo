import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

interface Resistencia2 {
  bandas: string[];
  tolerancia: number;
  valor: number;
  valorMax: number;
  valorMin: number;
}

@Component({
  selector: 'app-resistencias2',
  templateUrl: './resistencias2.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export default class Resistencias2Component {
  form: FormGroup;
  colors: string[] = [
    'Negro',
    'Café',
    'Naranja', 
    'Rojo',  
    'Amarillo', 
    'Verde', 
    'Azul', 
    'Morado', 
    'Gris', 
    'Blanco'
  ];
   valorResis: number = 0;
   valorMax: number = 0;
  valorMin: number = 0;
  showResults: boolean = false;
  resistencias: Resistencia2[] = [];
   colorValues: { [key: string]: number } = {
    Negro: 0,
    Café: 1,
    Rojo: 2,
    Naranja: 3,
    Amarillo: 4,
    Verde: 5,
    Azul: 6,
    Morado: 7,
    Gris: 8,
    Blanco: 9
  };
multipliers: { [key: string]: number } = {
    Negro: 1,
    Café: 10,
    Rojo: 100, 
    Naranja: 1000,
    Amarillo: 10000,
    Verde: 100000,
    Azul: 1000000,
    Morado: 10000000,
    Gris: 100000000,
    Blanco: 1000000000
  };
constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      color1: ['', Validators.required],
      color2: ['', Validators.required],
      color3: ['', Validators.required],
      tolerance: [5, Validators.required]
    });
  }
      calculate() {
     const value1 = this.colorValues[this.form.get('color1')?.value];
      const value2 = this.colorValues[this.form.get('color2')?.value];
     const multiplier = this.multipliers[this.form.get('color3')?.value];
     const tolerance = this.form.get('tolerance')?.value;
     const resistenciaValor = ((value1 * 10) + value2) * multiplier;
     this.valorResis = resistenciaValor;
     const porcentajeTole = tolerance / 100;
      this.valorMax = resistenciaValor * (1 + porcentajeTole);
       this.valorMin = resistenciaValor * (1 - porcentajeTole);
      this.showResults = true;
  }
  guardarResistencia() {
    const nuevaResistencia = {
      bandas: [
        this.form.get('color1')?.value,
        this.form.get('color2')?.value,
        this.form.get('color3')?.value
      ],
      tolerancia: this.form.get('tolerance')?.value,
      valor: this.valorResis,
      valorMax: this.valorMax,
      valorMin: this.valorMin
    };
    this.resistencias.push(nuevaResistencia);
    localStorage.setItem('resistencias', JSON.stringify(this.resistencias));
  }
  


     mostrarResistencias() {
    const resistenciasGuardadas = localStorage.getItem('resistencias');
    if (resistenciasGuardadas) {
      this.resistencias = JSON.parse(resistenciasGuardadas);
      console.log('Resistencias almacenadas:', this.resistencias);
    } else {
      console.log('No hay resistencias almacenadas.');}
  }
  getColorStyle(color: string) {
    switch (color) {
      case 'Negro': return '#000000';
      case 'Café':  return '#8B4513';
       case  'Rojo': return '#FF0000';
      case 'Naranja': return '#FFA500';
      case 'Amarillo':  return '#FFFF00';
      case 'Verde': return '#008000';
       case 'Azul':  return  '#0000FF';
       case 'Morado': return '#800080';
      case 'Gris': return  '#808080';
        case 'Blanco': return '#FFFFFF';
      default: return '';}
    }
   }
