import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//const {loginModel} = require('../models/loginModel');
export class LoginComponent implements OnInit {
  //model = new loginModel('','');

  //constructor(private loginService:LoginService) { }
  //login(){
    //this.loginService.login(this.model).subscribe(()=>{
      //this.router.navigate(['logado']);
    //},
      //(error)=>{
        //alert('usuário ou senha inválido');
        //console.log(error);
      //}
    //);
  //}

  ngOnInit(): void {
    //console.log(this.model);
  }

}
