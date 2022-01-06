import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service'
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url='/api';
  constructor(private http: HttpClient, private cookies: CookieService) { }
//consultar mascotas
  getall(usuario:string): Observable<any>{
    return this.http.get<any>('/api/consult/' + usuario);

  }
//buscar por id mascotass
  getid(id:string): Observable<any>{
    return this.http.get<any>('/api/buscar/' + id);

  }
//insertar mascota
  postmasc(masc:any):Observable<any>{
    return this.http.post<any>('/api/registrar',masc);
  }

  puteditmasc(id:string,masc:any):Observable<any>{
    return this.http.put<any>('/api/editar/' + id,masc);
  }

  //eliminar mascota
  elimasc(id:any):Observable<any>{
    return this.http.get<any>('/api/eliminar/'+id);
  }

  //iniciar sesion
  login(user: any): Observable<any> {
    return this.http.post('/api/login', user);
  }

  //registrarse en la pagina
  registrar(user: any): Observable<any> {
    return this.http.post('/api/registro', user);
  }

  //registrarse en la pagina
  conscitas(): Observable<any> {
    return this.http.get<any>('/api/citasdisp/');
  }

  agendarcita(masc:any): Observable<any> {
    return this.http.post('/api/agendarcita' , masc);
  }

  miscitas(usu:any): Observable<any> {
    return this.http.get('/api/miscitas/' + usu);
  }

  cancelar(usu:any): Observable<any> {
    return this.http.get('/api/cancelarcita/' + usu);
  }

  registrarcuenta(usu:any): Observable<any> {
    return this.http.post('/api/regicuenta' , usu);
  }

  buscaruser(usu:any): Observable<any> {
    return this.http.get('/api/buscaruser/' + usu);
  }

  cartillasvac(id:any): Observable<any> {
    return this.http.get('/api/cartilla/' + id);
  }

  validarcitas(id:any): Observable<any> {
    return this.http.get('/api/validarcita/' + id);
  }

  //set cookie
  setToken(token: any) {
    this.cookies.set("token",token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  getout(){
    this.cookies.delete("token");
  }
 
}

export interface Equipo{
    id_mascota?:string,
    nombre?:string,
    tipo?:string,
    edad?:string,
    usuario?:string

}

export interface inises{
  usuario?:string,
  contra?:string
}

export interface usu{
  usuario?:string
}

export interface citasdisp{
  idcita?:string,
  fecha?:string
}

export interface agendarcita{
  idcita?:string,
  usuario?:string
}

export interface registrarusuario{
  idusuario?:string,
  nombre?:string,
  contra?:string,
  usuario?:string,
  correo?:string
}

export interface cartilladatos{
  idmascota?:string,
  peso?:string,
  nomvac?:string,
  fechaapl?:string,
  fechasig?:string,
  nombre_vac?:string,
  usuario?:string
}





