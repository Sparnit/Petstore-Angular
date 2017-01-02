import { Injectable } from '@angular/core';
import { Token } from './models/token';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router }   from '@angular/router';
import { environment } from '../environments/environment'

@Injectable()
export class LoginService {

  constructor(private http: Http, private router: Router){
  }

  login(user: any): Promise <any>{
     return this.http.post(environment.serviceEndpoint +"/login", user)
               .toPromise()
               .then((response) => { 
                 console.log(response);
                 let tokenObj = response.json() as Token;
                 localStorage.setItem('token', tokenObj.token);
                 localStorage.setItem('role', tokenObj.role);
                 console.log('logged in');
                 return response;
               })
              .catch(error =>{
                console.log('error');
                return Promise.reject(error);
              })
  }  

  logout(): void{
      localStorage.clear();
      this.router.navigate(['login']);
  }  
}
