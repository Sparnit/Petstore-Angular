import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-petstore-header',
  templateUrl: './petstore-header.component.html',
  styleUrls: ['./petstore-header.component.css']
})
export class PetstoreHeaderComponent implements OnInit{
  @Input()
  hideLinks:boolean;

  role: string;
  
  ngOnInit(){
    this.role = localStorage.getItem("role");
  }
  constructor(private loginService: LoginService){};


  logOut():void{
    this.loginService.logout();
  }
}
