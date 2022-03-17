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

  regiones: string[] = ['FAIL', 'EU','EFTA','CARICOM','PA','AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC'];
  regionActiva: string ="";
  hayError: boolean = false;
  paises: Country[] = [];


  constructor(private paisService: PaisService) { }

  activarRegion (region: string ) {

    if ( region === this.regionActiva) {return;}
    this.regionActiva = region;
    this.hayError = false;
    this.paises =[];
    

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
