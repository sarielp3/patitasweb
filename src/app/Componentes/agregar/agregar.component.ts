import { Component, OnInit } from '@angular/core';
import {Equipo,EquipoService,usu} from '../../Servicio/equipo.service';
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  
  equipo: Equipo={
    id_mascota:'',
    nombre:'',
    tipo:'',
    edad:'',
    usuario:''
  }

  mosusu: usu = {
    usuario:''
  }

 
  constructor(private EquipoService:EquipoService,private router:Router) { 
    this.agregarform = this.createformgroup();
  }

  onresetform(){
    this.agregarform.reset();
  }

  createformgroup(){
    return new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.minLength(3)]),
      tipodemasc: new FormControl('',[Validators.required,Validators.minLength(3)]),
      edad: new FormControl('',[Validators.required]),

    });
  }

  agregarform: FormGroup;
  
  ngOnInit(): void {

  }

  agregar(){
    if(this.agregarform.valid){
      
      console.log('Valido');
      delete this.equipo.id_mascota;
      this.equipo.usuario = this.getuser1();
      this.EquipoService.postmasc(this.equipo).subscribe();
      this.router.navigate(['/inicio']);
    }else{
      console.log('no valido')
    }
    
  }

  getuser1(){
    this.mosusu.usuario = this.EquipoService.getToken();
   // console.log(this.mosusu.usuario);
    return this.mosusu.usuario;
  }

  get nombre(){ return this.agregarform.get('nombre')};
  get tipodemasc(){ return this.agregarform.get('tipodemasc')};
  get edad(){ return this.agregarform.get('edad')};

}
