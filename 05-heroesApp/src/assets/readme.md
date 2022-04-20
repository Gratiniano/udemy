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

# Heroes Service - Recuperar información

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



