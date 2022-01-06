import { Component, OnInit } from '@angular/core';
import {Equipo,EquipoService,cartilladatos} from '../../Servicio/equipo.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {

  constructor(private EquipoService:EquipoService,private router:Router
    ,private activeRoute:ActivatedRoute) { }

    listardatosc: cartilladatos[] = [];

    equipo : Equipo = {
      nombre:''
    }

  ngOnInit(): void {
    const id_entrada = <string>this.activeRoute.snapshot.params.id;
    console.log('id de entrada: ' + id_entrada);
    this.listardatos();
   if(id_entrada){
      this.EquipoService.getid(id_entrada).subscribe(
        res=>{
          this.equipo = res[0]
          //console.log(res[0])
        },
        err => console.log(err)
        
      );
    }
  }

  listardatos(){
    this.EquipoService.cartillasvac(<string>this.activeRoute.snapshot.params.id).subscribe(
      (res)=>{
        this.listardatosc=<any>res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  agregareg(){
    
  }

}
