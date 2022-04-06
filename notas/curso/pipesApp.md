Los pipes no cambian los objetos. Solo su presentación.

Utiliza **primeNg** que es una librería de componentes.

# Pipes en Angular 
## common
|  AsyncPipe 
|  DecimalPipe 
|  JsonPipe 
|  PercentPipe 
|  UpperCasePipe 
| CurrencyPipe  
|  l18nPluralPipe 
|  KeyValuePipe 
|  SlicePipe 
|  DatePipe 
|  TitleCasePipe 

## core
Pipe
PipeTransform


#  PrimeNg
## Instalar PrimeNg
En la consola 
```shell
npm install primeng primeicons --save
```
Es necesario que se instalen localmente a la aplicación para que luego esta los pueda localizar.


Modificar *angular.json*
```json
architect -> assets -> styles

"styles": [
	"src/styles.scss",
	"node_modules/primeicons/primeicons.css",
	"node_modules/primeng/resources/themes/lara-light-blue/theme.css",
	"node_modules/primeng/resources/primeng.min.css"

 ],
```

Aplicación de fuentes, colores e iconos
```html
<button pButton
 (click)="mostrarNombre()" 
 type="button"
 icon="pi pi-bell"
 iconPos="right"
 class="p-button-help"
 label="Cambiar nombre">

</button>
```

## Instalar PrimeFlex
PrimeFlex is a lightweight responsive CSS utility library to accompany Prime UI libraries and static webpages as well.
```shell
npm install primeflex --save
```

Actualizar *angular.json*
```json
"styles": [
	...,
 "node_modules/primeflex/primeflex.css"
 ],
```

