import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Pet } from '../models/pet';
import { Router }   from '@angular/router';

export class User {
  constructor(
    public username: string,
    public password: string) { }
}

@Component({
  selector: 'app-petstore-login',
  templateUrl: './petstore-login.component.html',
  styleUrls: ['./petstore-login.component.css']
})



export class PetstoreLoginComponent{
   incorrectLogin:boolean;
   form : FormGroup;
    constructor(private router: Router,builder: FormBuilder,private loginService: LoginService){
      this.form = builder.group({
      'username' : '',  
      'password' : '',
    });
    }
 
    submitForm(formData: any):void{
      let user = new User(formData.username, formData.password);
      console.log('submitted');
      this.loginService.login(user).then(token =>{
          this.router.navigate(['petListing']);
      }).catch(error =>{
        this.incorrectLogin = true;
        console.log("cant login error");
      });
    }

}
