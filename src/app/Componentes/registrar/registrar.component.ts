import { Component, OnInit } from '@angular/core';
import {registrarusuario,EquipoService,usu} from '../../Servicio/equipo.service';
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  
  constructor(private EquipoService:EquipoService,private router:Router) {
    this.registerform = this.createformgroup();
  }

  onresetform(){
    this.registerform.reset();
  }

  createformgroup(){
    return new FormGroup({
      nombre: new FormControl('',[Validators.required, Validators.minLength(5)]),
      correo: new FormControl('',[Validators.required, Validators.minLength(5)]),
      usuario: new FormControl('',[Validators.required, Validators.minLength(5)]),
      pass: new FormControl('',[Validators.required, Validators.minLength(5)]),
      repass: new FormControl('',[Validators.required, Validators.minLength(5)]),


    });
  }

  registerform: FormGroup;

  prueba(){
    if(this.registerform.valid){
      
      console.log('Valido');
      this.agregar();
    }else{
      console.log('no valido')
    }
  }

  datosusuario: registrarusuario={
    idusuario:'',
    nombre:'',
    contra:'',
    usuario:'',
    correo:''
  }

  mosusu: usu = {
    usuario:''
  }

  busca: usu = {
    usuario:''
  }

  recontra: string = '';
  isDisabled: boolean = true;
  ngOnInit(): void {
    this.validacooki();
  }

  agregar(){
    delete this.datosusuario.idusuario;
    this.EquipoService.registrarcuenta(this.datosusuario).subscribe();
    window.alert("Cuenta Registrada, inicia sesion ahora!");
    this.router.navigate(['/login']);
  }

  validacooki(){
    if(this.getuser1() != ''){
      this.router.navigate(['/inicio']);
    }else{

    }
  }

  validadatos(){
    if(this.registerform.valid){
      //this.onresetform();
      console.log('Valido');
    
    if(this.recontra == this.datosusuario.contra){
      this.EquipoService.buscaruser(this.datosusuario.usuario).subscribe(
        (res)=>{
          this.busca=<any>res;
          if(res == null){
            console.log('no existe');
            this.agregar();
          }else{
            console.log('si existe');
            window.alert("El usuario ingresado ya existe!");
    
          }
          //console.log(res);
        },
        err => console.log(err)
      );
      

    }else{
      window.alert("No coinciden las contraseñas!");
    }
  }

  }

  getuser1(){
    this.mosusu.usuario = this.EquipoService.getToken();
   // console.log(this.mosusu.usuario);
    return this.mosusu.usuario;
  }

  get nombre(){ return this.registerform.get('nombre')};
  get correo(){ return this.registerform.get('correo')};
  get usuario(){ return this.registerform.get('usuario')};
  get pass(){ return this.registerform.get('pass')};
  get repass(){ return this.registerform.get('repass')};


}
