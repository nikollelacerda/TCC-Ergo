import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cadastro } from './cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http:HttpClient) { }

  cadastraUsuario(cadastro:Cadastro){
    return this.http.post('http://localhost:3000/user/signup', cadastro);
  }
}
