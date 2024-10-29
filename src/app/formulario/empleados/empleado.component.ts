import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
  pago: number;
  horasExtras: number; 
  subtotal: number; 
}
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export default class EmpleadoFormComponent {
  matricula = '';
  nombre = '';
  correo = '';
  edad = 0;
  horasTrabajadas = 0;
  empleados: Empleado[] = [];
  totalPago = 0;

  registrarEmpleado() {
    const { pago, horasExtras, subtotal } = this.calcularPago(this.horasTrabajadas);
    const empleado: Empleado = {
      matricula: this.matricula,
       nombre: this.nombre,
       correo: this.correo,
       edad: this.edad,
      horasTrabajadas: this.horasTrabajadas,
      pago: pago,
      horasExtras: horasExtras,
      subtotal: subtotal};
    const empleadosGuardados = localStorage.getItem('empleados');
     const empleados = empleadosGuardados ? JSON.parse(empleadosGuardados) : [];
    empleados.push(empleado);
     localStorage.setItem('empleados', JSON.stringify(empleados));
    this.limpiarFormulario();
  }
imprimirEmpleados() 
{
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      const empleados = JSON.parse(empleadosGuardados);
      console.log('Empleados registrados:', empleados);
    } else {
      console.log('No hay empleados registrados.');
    }}    
    mostrarEmpleadosTabla() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
      this.totalPago = this.empleados.reduce((total, emp) => total + emp.subtotal, 0); 
    } else {
      this.empleados = [];
      this.totalPago = 0; }
  }
  eliminarEmpleado() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      let empleados = JSON.parse(empleadosGuardados);
      empleados = empleados.filter((empleado: Empleado) => empleado.matricula !== this.matricula);
      localStorage.setItem('empleados', JSON.stringify(empleados));
      this.mostrarEmpleadosTabla();
      this.limpiarFormulario();
    } else 
    {
      console.log('No hay empleados registrados para eliminar.');
    }
  }
  modificarEmpleado() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      const empleados = JSON.parse(empleadosGuardados);
      const index = empleados.findIndex((empleado: Empleado) => empleado.matricula === this.matricula);
      if (index !== -1) {
        empleados[index].nombre = this.nombre;
        empleados[index].correo = this.correo;
        empleados[index].edad = this.edad;
       empleados[index].horasTrabajadas = this.horasTrabajadas;
      const { pago, horasExtras, subtotal } = this.calcularPago(this.horasTrabajadas);
      empleados[index].pago = pago; 
        empleados[index].horasExtras = horasExtras; 
      empleados[index].subtotal = subtotal;

        localStorage.setItem('empleados', JSON.stringify(empleados));
        this.mostrarEmpleadosTabla();
        this.limpiarFormulario();
      } else {
        console.log('Empleado no encontrado para modificar.');}
    } else {
      console.log('no hay empleados registrados.');
    }
  }
calcularPago(horas: number): { pago: number, horasExtras: number, subtotal: number } {
     const horasExtras = horas > 40 ? horas - 40 : 0;
    const pago = horas > 40 ? 40 * 70 : horas * 70;
     const subtotal = pago + (horasExtras * 140);
     return { pago, horasExtras, subtotal };
  }
  limpiarFormulario() {
    this.matricula = '';
    this.nombre = '';
    this.correo = '';
    this.edad = 0;
    this.horasTrabajadas = 0;
  }
}
