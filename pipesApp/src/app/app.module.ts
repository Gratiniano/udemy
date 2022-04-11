import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';



import { AppRouterModule } from './app-router.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { SharedModule } from './shared/shared.module';
import { VentasModule } from './ventas/ventas.module';

import localeEs from '@angular/common/locales/es';
import localefR from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeEs);
registerLocaleData(localefR);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PrimeNgModule, 
    AppRouterModule,
    SharedModule,
    VentasModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue:'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
