import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { AgregarComponent } from './Componentes/agregar/agregar.component';
import { ModificarComponent } from './Componentes/modificar/modificar.component';
import { LoginComponent } from './Componentes/login/login.component';
import { AgendarcitaComponent } from './Componentes/agendarcita/agendarcita.component';
import { MiscitasComponent } from './Componentes/miscitas/miscitas.component';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { CartillaComponent } from './Componentes/cartilla/cartilla.component';

const routes: Routes = [
  { path:'',redirectTo:'/login', pathMatch:'full'},
  {path:'inicio', component:InicioComponent},
  {path:'add', component:AgregarComponent},
  {path:'edit/:id', component:ModificarComponent},
  {path:'login', component:LoginComponent},
  {path:'AgendarCita', component:AgendarcitaComponent},
  {path:'MisCitas', component:MiscitasComponent},
  {path:'RegistrarCuenta', component:RegistrarComponent},
  {path:'CartillaVacunacion/:id', component:CartillaComponent},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
