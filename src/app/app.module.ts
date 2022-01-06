import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AgregarComponent } from './Componentes/agregar/agregar.component';
import { ModificarComponent } from './Componentes/modificar/modificar.component';
import { LoginComponent } from './Componentes/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AgendarcitaComponent } from './Componentes/agendarcita/agendarcita.component';
import { MiscitasComponent } from './Componentes/miscitas/miscitas.component';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartillaComponent } from './Componentes/cartilla/cartilla.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AgregarComponent,
    ModificarComponent,
    LoginComponent,
    AgendarcitaComponent,
    MiscitasComponent,
    RegistrarComponent,
    CartillaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
