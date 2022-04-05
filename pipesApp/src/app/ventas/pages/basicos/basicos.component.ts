import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent  {

  nombreLower: string = 'gratiniano';
  nombreUpper: string = 'GRATINIANO';
  nombreCompleto: string = 'GratiNianO';


  fecha: Date = new Date();


  constructor() { }



}
