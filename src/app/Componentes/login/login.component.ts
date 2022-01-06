import { Component, OnInit } from '@angular/core';
import {inises,EquipoService} from '../../Servicio/equipo.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nomusu: string = '';

  equipo: inises={
    usuario:'',
    contra:''
  }

  constructor(private EquipoService:EquipoService, private router:Router
    ,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  login() {
    this.EquipoService.login(this.equipo).subscribe(res=>{
      this.equipo = res;
      if(res.status=='iniciaste sesion'){
        console.log('si se pudo');
        this.EquipoService.setToken(res.user);
        this.router.navigate(['/inicio']);
      }
     // console.log(res)
    },
    err => console.log(err));

    console.log(this.equipo.usuario);
    console.log(this.equipo.contra);
    
    
  }

}
