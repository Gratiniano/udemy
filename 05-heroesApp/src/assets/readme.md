# Seccion 12:  Rutas principales - Root

```shell
 ng g m appRouting --flat
```
Buscamos crear un módulo en la raíz del proyecto.--> *app-routing-module.ts*

En este módulo definimos y exportamos las rutas y módulos necesarios.
```typescript
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';

    import { ErrorPageComponent } from './shared/error-page/error-page.component';

    const routes: Routes =[
    {
        path:'404',
        component: ErrorPageComponent
    },
    {
        path: '**',
        component: ErrorPageComponent 
    }

    ]


    @NgModule({

    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
    })
```

# Rutas hijas y LazyLoad - AuthRoutes
Declaramos un módulo de routing *auth-routing-module.ts*
```typescript
...
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule ]
})
```
Observar el uso de *RouterModule.forChild*.

Se importa a nivel del componente **Auth**.

`auth.module.ts`
```typescript
    @NgModule({
    declarations: [
        LoginComponent,
        RegistroComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
    })
``` 
En el archivo de rutas a nivel raíz (*app-routing.module.ts* en el ejemplo) le indicamos que debe cargar los hijos:
```typescript
const routes: Routes =[
  {
    path: 'auth',
    loadChildren:() => import('./auth/auth.module').then ( m => m.AuthModule)
  },
    ...
  
})
```
Se trata de una **promesa**, por ese motivo le podemos añadir el *.then* y saber cuando se ha cumplido.




# Seccion 13: HeroesApp - Angular Material & Angular Flex-Layout

Instalación de Angular Material y Angular Flex-Layout

**Angular Flex-Layout** ofrece un grid para respuesta responsiva.

```shell
    ng add @angular/material
    npm i @angular/flex-layout
    npm i -s @angular/flex-layout @angular/cdk
```

En el módulo del componente donde vayamos a utilizar **Flex-layout** ( en nuestro caso *heroes.module.ts*): 
```typescript
import { FlexLayoutModule } from '@angular/flex-layout';

imports[
    ...,
    FlexLayoutModule,
    ]
```

#### Ejemplo Sidenav

`home.component.html`
```html
<mat-sidenav-container fullscreen mode="push">

    <mat-sidenav #sidenav>
        <h1>SideNav</h1>
    </mat-sidenav>

    <mat-toolbar>
        <button mat-icon-button
            (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
        </button>
    </mat-toolbar>

</mat-sidenav-container>
```
Para poder usar estos componentes, hemos tenido que importarlos antes en `material.module.ts`.


# Heroes Backend. JSON Server

Permite crear un backend rest con "cero configuración"

## Instalación

**Instalar JSON Server**
```shell
  npm install -g json-server
```
**Crear la base de datos**
Creamos el fichero  */05-heroes-server/db.json* que contendrá la información a servir.

**Iniciar el servidor**
```shell
  json-server --watch db.json
```

Nos debe dar la salida
```
    \{^_^}/ hi!

    Loading db.json
    Done

    Resources
    http://localhost:3000/usuarios
    http://localhost:3000/heroes

    Home
    http://localhost:3000
```

Ya podemos hacer peticiones REST en el puerto 3000.

## Heroes Service - Recuperar información

```shell
    ng generate service heroes/services/heroes
```
generará el fichero `heroes-service.ts`.
```typescript
    import { Injectable } from '@angular/core';

    @Injectable({
    providedIn: 'root'
    })
    export class HeroesService {

    constructor() { }
    }
```

La instruccion `providedIn: 'root'` indica que el servicio estará disponible a nivel de aplicación, en lugar de a nivel de módulo [Providing dependencies in modules](https://angular.io/guide/providers).

Esto implica que será necesario importar ***HttpClientModule*** a nivel de aplicación (*app.module.ts*) para que el servicio pueda ser invocado desde cualquier parte.

### Atributos opcionales en un interface de Typescript
```typescript
  export interface Heroe {
      id?:               string;
      superhero:        string;
      alt_img?:         string;
  }
```
### Explicitar las funciones que devuelven **Observables**
No es necesario, pero es conveniente por claridad del código.

`heroes.service.ts`
```typescript
  getHeroes():Observable<Heroe[]>{
      return this.http.get<Heroe[]>('http://localhost:3000/heroes');
  }
```

¿Porqué es un *Observable*? Porque el método *get* de *HttpClient* lo es.


## HeroeTarjeta. Componentes.
**Recopilatorio**
- crear un nuevo componente con `ng g c heroes/components/heroeTarjeta --skip-test -is
- copiar la etiqueta <mat-card> y su contenido al componente.
- Establecer un parámetro de entrada (`@Input() heroe!: Heroe;`) en `heroe-tarjeta.component.ts`.
- Modificar `listado.component.html`para invocar adecuadamente al nuevo componente pasandole el héroe cómo parámetro
```typescript
 <app-heroe-tarjeta [heroe]="heroe"></app-heroe-tarjeta>
```

## PipeImagen

Utilizar ***pipes*** para construir la ruta de las imagenes.

```shell
  ng generate pipe heroes/pipes/imagen --skip-tests
```
`imagen.pipe.ts`
```Typescript
  transform(heroe: Heroe): string {
    return `assets/heroes/${ heroe.id }.jpg`;
  }
```

`heroe-tarjeta.component.html`
```html
  <img mat-card-image src="{{heroe | imagen}}">
```


## Ruta Heroe y Editar Heroe.
Se trata de navegar a la página de detalle de Heroe.

`heroe-tarjeta.component.html`
```html
        <button mat-button 
            color="warn"
            [routerLink]="['/heroes', heroe.id]">
            Leer mas...
        </button>
```

## Pantgalla de Heroe
Ilustra el uso de *matGridList* y *ProgressSpinner*.
También ilustra la navegación entre pantallas y componentes.

`heroe-tarjeta.component.html` inicia la navegación
```typescript
        <button mat-button color="info"
            [routerLink]="['/heroes/editar', heroe.id]">
            Editar
        </button>
```
`heroes-routing.module.ts` tiene definida la navegación.
```typescript
const routes : Routes =[
  {
    path: '',
    component: HomeComponent,
    children: [
      ...
      {path: ':id', component: HeroeComponent},
      ...
    ]
  }
```

`heroe.component.ts`invoca y consume el servicio proveedor.
```typescript

  heroe!: Heroe;

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroePorId(id) )
      )
      .subscribe( heroe => this.heroe = heroe);
  }
```

`heroes.service.ts` realiza la llamada rest para obtener los datos del heroe
```typescript
  getHeroePorId(id: string):Observable<Heroe>{
    return this.http.get<Heroe>(`http://localhost:3000/heroes/${id}`);
  }
```
* Interesante, para definir que una cadena contiene variables que pueden sustituirese se usa el delimitador "acento grave" (\`).


## 196. Diseño de la pantalla.
Se programa el retorno a la pantalla anterior.
`heroe.component.html`
```html
    <button mat-button color="warn" click()="regresar()">
        Regresar
    </button>
```

`heroe.component.ts`
```Typescript
  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router) { }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }
```
**Observar uso del objeto *Router*.**


## Variables de Entorno+

Carpeta **src/environments** contiene los ficheros de configuración del entorno:
- *enrironment.ts*.
- *environtment.prod.ts*.

`environment.prod.ts`
```Typescript
  export const environment = {
    production: true,
    baseUrl: 'http://host-produccion'
  };
```

`environment.ts`
```Typescript
  export const environment = {
    production: false
    baseUrl: 'http://localhost:3000'
  };
```

Se puede consultar en los componentes y modulos.

`heroes.service.ts`
```Typescript
  import { environment } from 'src/environments/environment';
  ...
  baseUrl:string = environment.baseUrl;
  ...
  getHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
```

Cuando se haga el build se indicará qué fichero de configuración reemplaza a *environment.ts*. Esto se indica en `angular.json`.
```typescript
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ],
      ...
```

Y se indica mediante parámetro en el momento de la construcción
```shell
  ng build --configuration production 
```

https://runebook.dev/es/docs/angular/-index-#Guide



## 198. Material autocomplete.

Usa el componente **mat-autocomplete** asociado a un elemento del formulario.
Usa *formularios asociados a templates*, para ello:

`heroes.module.ts`
```Typescript
  import { FormsModule } from '@angular/forms';
```
`buscar.component.html`
```html
  <input type="text"
         ...
        [(ngModel)]="termino"
        ...
  >
```

Para poder utilizar el servicio de busqueda debemos inyectarlo en el constructor del componente.
`buscar.component.ts`
```typescript
  import { HeroesService } from '../../services/heroes.service';
  ...
   constructor(private heroeService: HeroesService) { }
```

## 199. Autocomplete

Genera un nuevo endpoint usando las capacidades de query de **json_server**: <url>?q=<patron>


Para determinar qué selección se realizó utiliza la propiedad *optionSelected* de *mat-autocomplete*.

`buscar.component.html`
```Typescript
  <mat-autocomplete autoActiveFirstOption 
                  #auto="matAutocomplete"
                  (optionSelected)="opcionSeleccionada( $event )">
  <mat-option *ngFor="let heroe of heroes" [value]="heroe">
  ...
  <div>
    {{ heroeSeleccionado | json }}
  </div>

```

`buscar.component.ts`
```typescript
  heroeSeleccionado!: Heroe;
  ...
  opcionSeleccionada ( event: MatAutocompleteSelectedEvent){
    const heroe:Heroe = event.option.value;

    this.termino = heroe.superhero;

    this.heroeService.getHeroePorId(heroe.id!)
      .subscribe( heroe => this.heroeSeleccionado = heroe );
  }
```



# Sección 14. HeroesApp - CRUD (Continuación con Angular Material)
## 207. Diseño de la pantalla para agregar heroes.
## 208. Insertar en base de datos.

**Ajuste anchura pantalla**
Se hace con Flex Layout
`agregar.component.html`
```typescript
<div  fxLayout="row" 
          fxLayout.xs="column"
          fxLayoutGap="20px">
    
```

**Inserción en la base de datos**
Lo hacemos mediante el método **POST**.

`heroes.service.ts`
```Typescript
  agregarHeroe( heroe: Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe)

  }
```
