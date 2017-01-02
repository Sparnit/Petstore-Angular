import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router){}
    canActivate():boolean {
    if(localStorage.getItem("token")){
        return true;
    }
    //Redirect the user before denying them access to this route
    this.router.navigate(['Login']);
    return false;
}
}