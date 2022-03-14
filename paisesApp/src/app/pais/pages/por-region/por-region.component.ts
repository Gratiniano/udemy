import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
  button{
    margin-right: 5px;
  }
  `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania']
  regionActiva: string ="";
  hayError: boolean = false;
  paises: Country[] = [];


  constructor(private paisService: PaisService) { }

  activarRegion (region: string ) {
    this.regionActiva = region;
    this.hayError = false;
    

    this.paisService.getPaisesPorRegion(region)
    .subscribe( 
      (paises: Country[]) =>{
        console.log(paises);        
        this.paises = paises;
      }, 
      (err: any)=>{
        console.log('Error');
        console.info(err);
        this.hayError = true;
        this.paises = [];
      });
  }

  

  getClaseCSS(region:string): string{
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary'
  }
}
