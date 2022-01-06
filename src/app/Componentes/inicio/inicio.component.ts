import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipoService, Equipo,usu } from '../../Servicio/equipo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[EquipoService]
})
export class InicioComponent implements OnInit {

  listarmascotas: Equipo[] = [];
  mosusu: usu = {
    usuario:''
  };

  constructor(private EquipoService:EquipoService, private router:Router) { }
 
  ngOnInit(): void {
    this.getuserlog();
    this.listarequipos();
    
  }
    listarequipos(){
      this.EquipoService.getall(this.getuser1()).subscribe(
        (res)=>{
          this.listarmascotas=<any>res;
          console.log(res);
        },
        err => console.log(err)
      );
    }

    modificarMascota(id:string){
        this.router.navigate(['/edit/' + id]);
    }

    cartilla(id:string){
      this.router.navigate(['/CartillaVacunacion/' + id]);
  }

    eliminarMascota(id:string){
      this.EquipoService.elimasc(id).subscribe(
        (res)=>{
          this.listarequipos();
          console.log(res);
        },
        err => console.log(err)
      );
    }

    getuserlog(){
      this.mosusu.usuario = this.EquipoService.getToken();
      console.log(this.mosusu.usuario);
      
    }

    getuser1(){
      this.mosusu.usuario = this.EquipoService.getToken();
     // console.log(this.mosusu.usuario);
      return this.mosusu.usuario;
    }

    salir(){
      this.EquipoService.getout();
      this.router.navigate(["/login"]);
      //window.location.reload();


    }


}
