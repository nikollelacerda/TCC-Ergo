export default class CadastroModel {
    username:string;
    password:string;
    nome:string;
    sobrenome:string;
    repassword:string;
    constructor(
        username: string, 
        password: string,
        nome: string,
        sobrenome: string,
        repassword: string,
    ){
        this.username = username;
        this.password = password;
        this.nome = nome ;
        this.sobrenome = sobrenome;
        this.repassword = repassword;
    }
}