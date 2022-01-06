import { Component, OnInit } from '@angular/core';
import {EquipoService,citasdisp,usu} from '../../Servicio/equipo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-miscitas',
  templateUrl: './miscitas.component.html',
  styleUrls: ['./miscitas.component.css'],
  providers:[EquipoService]
})
export class MiscitasComponent implements OnInit {
  miscitas: citasdisp[] = [];
  mosusu: usu = {
    usuario:''
  };
  constructor(private EquipoService:EquipoService,private router:Router) { }

  ngOnInit(): void {
    this.listarcitas();
    //this.miscitas.usuario = this.getuser1();
  }

  listarcitas(){
    this.EquipoService.miscitas(this.getuser1()).subscribe(
      (res)=>{
        this.miscitas=<any>res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  cancelada(aid:string){
    this.EquipoService.cancelar(aid).subscribe(
      (res)=>{
       // this.miscitas=<any>res;
        this.listarcitas();
        console.log(res);
      },
      err => console.log(err)
    );

  }

  getuser1(){
    this.mosusu.usuario = this.EquipoService.getToken();
   // console.log(this.mosusu.usuario);
    return this.mosusu.usuario;
  }

}
