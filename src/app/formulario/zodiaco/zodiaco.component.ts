import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacosComponent {
  zodiacForm: FormGroup;
  zodiacoSigno: string = '';
  zodiacoImagen: string = '';
  edad: number = 0;
  chinoZodiacoSigno: string[] = [
    'Rata', 
    'Buey', 
    'Tigre', 
    'Conejo', 
    'Dragón', 
    'Serpiente', 
    'Caballo', 
    'Cabra', 
    'Mono', 
    'Gallo', 
    'Perro', 
    'Cerdo'
  ];
  chinoZodiacoImagen: { [key: string]: string } = {
    'Rata': 'https://fumigasin.com/wp-content/uploads/2024/06/01-rat-friends-nationalgeographic_1162144.jpg', 
    'Buey': 'https://peopleenespanol.com/thmb/ia0u33jxk7_bfFTLf1viDW9j5LA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/horoscopo-chino-buey-de-metal-2021-e93c7ebe89ab4c0daa8704d6e4a827dd.png',
    'Tigre': 'https://media.gettyimages.com/id/1346341844/es/vector/a%C3%B1o-nuevo-tiger-paperart.jpg?s=612x612&w=gi&k=20&c=WHQuCOtwXa4hoByeS-Zp9jGS7KxdvvN79-LC31KsL9Y=',
    'Conejo': 'https://www.clarin.com/2023/09/23/TSN1Cvpys_360x240__1.jpg',
    'Dragón': 'https://img.freepik.com/fotos-premium/dragon-chino-sobre-fondo-blanco-hecho-inteligencia-artificial-ai_41969-12099.jpg?w=360',
    'Serpiente': 'https://media.istockphoto.com/id/165930223/es/vector/a%C3%B1o-de-la-serpiente.jpg?s=612x612&w=0&k=20&c=KPbx-vCkDwNB1JCMkGDze2VG_TGLXit4M_u8JAQqOok=',
    'Caballo': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg',
    'Cabra': 'https://www.clarin.com/2023/09/23/lBvOi_7yy_2000x1500__1.jpg',
    'Mono': 'https://img.asmedia.epimg.net/resizer/v2/AYM47ANZSFGRBAE74BKVN4MDIM.jpg?auth=810dc6e8204f93610ba8c1daece7633adac5046a53d21f92c65819da84d87e6b&width=1472&height=828&smart=true',
    'Gallo': 'https://i.ytimg.com/vi/oPt7fHX0UOk/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCrGHEaPOdmlp8fit-Ws10X8eoAIQ',
    'Perro': 'https://www.hola.com/horizon/landscape/91f515daa34b-crestado-t.jpg?im=Resize=(1200)',
    'Cerdo': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6vRDTlPe4DfhiCSUQaL9FD9hk8InYtMAyig&s'
  };

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
  calcularSignoChino(ano: number): string {
    const index = (ano - 4) % 12;
    return this.chinoZodiacoSigno[index];
  }
  ObtenerZodiacImage(sign: string): string {
    return this.chinoZodiacoImagen[sign];
  }
  calcularEdad(): number {
    const diaNacimiento = this.zodiacForm.get('dia')?.value;
    const mesNacimiento = this.zodiacForm.get('mes')?.value;
    const anoNacimiento = this.zodiacForm.get('ano')?.value;

    const fechaNacimiento = new Date(anoNacimiento, mesNacimiento - 1, diaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    return edad;
  }


  onSubmit() {
    if (this.zodiacForm.valid) {
      const ano = this.zodiacForm.get('ano')?.value;
      
      this.zodiacoSigno = this.calcularSignoChino(ano);
      this.zodiacoImagen = this.ObtenerZodiacImage(this.zodiacoSigno);
      this.edad = this.calcularEdad();  
      console.log('Edad del usuario:', this.edad);
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}


