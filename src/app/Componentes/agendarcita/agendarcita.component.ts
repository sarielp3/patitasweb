import { Component, OnInit } from '@angular/core';
import {agendarcita,EquipoService,usu,citasdisp} from '../../Servicio/equipo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agendarcita',
  templateUrl: './agendarcita.component.html',
  styleUrls: ['./agendarcita.component.css'],
  providers:[EquipoService]
})
export class AgendarcitaComponent implements OnInit {


  mosusu: usu = {
    usuario:''
  }

  agendacita: agendarcita = {
    idcita:'',
    usuario:''
  }

  citasdi: citasdisp[] = [];

  
  constructor(private EquipoService:EquipoService,private router:Router) {}

  ngOnInit(): void {
    this.listarcitas();
    this.agendacita.usuario = this.getuser1();
    this.validarlacita();
  }

  listarcitas(){
    this.EquipoService.conscitas().subscribe(
      (res)=>{
        this.citasdi=<any>res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  validarlacita(){
    this.EquipoService.validarcitas(this.getuser1()).subscribe(
      (res)=>{
        
        console.log(res);
        if(res.length > 1){
          window.alert("No puedes agendar mas de 2 citas!");
          this.router.navigate(['/MisCitas']);
        }
      },
      err => console.log(err)
    );
    
  }

  agendar(id:string){
    if(id == ''){
      window.alert("Seleccione una fecha!");
    }else{
      this.agendacita.idcita = id;
    this.EquipoService.agendarcita(this.agendacita).subscribe(
      (res)=>{
        //this.listarequipos();
        console.log(this.agendacita.idcita);
        console.log(this.agendacita.usuario);
        console.log(res);
      },
      err => console.log(err)
    );
    window.alert("Cita Agendada!");
    this.router.navigate(['/inicio']);
    }
  }

  getuser1(){
    this.mosusu.usuario = this.EquipoService.getToken();
   // console.log(this.mosusu.usuario);
    return this.mosusu.usuario;
  }

}
