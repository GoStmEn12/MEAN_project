import { Component } from '@angular/core';

@Component({
  selector: 'app-reg',
  imports: [],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {

    name:string="";
    login:string="";
    email:string="";
    password:string="";
    constructor(){}
    userRegisterClick(){
        console.log(this.name);
        return false;
    }
}
