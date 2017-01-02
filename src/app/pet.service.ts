import { Injectable } from '@angular/core';
import { PETS } from './mockPets';
import { Pet } from './models/pet'
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class PetService {
  constructor(private http: Http){
  }
   getPets(): Promise <Pet[]>{
     let header = new Headers({'Authorization': localStorage.getItem('token')});
     let options = new RequestOptions({ headers: header });

     return this.http.get( environment.serviceEndpoint + "/pet/all", options)
               .toPromise()
               .then((response) => {
                 console.log('look I got something');
                 return response.json() as Pet[]
               })
              .catch(error =>{
                console.log('error');
                return Promise.reject('error');
              })
  }
   getPet(petId:number): Promise <Pet>{
     let header = new Headers({'Authorization': localStorage.getItem('token')});
     let options = new RequestOptions({ headers: header});

     return this.http.get(environment.serviceEndpoint + "/pet/" + petId, options)
               .toPromise()
               .then((response) => {
                 console.log('Got a response');
                 return response.json() as Pet
               })
              .catch(error =>{
                console.log('error');
                return Promise.reject('error');
              })
  }
  deletePet(petId:number): Promise <any>{
     let header = new Headers({'Authorization': localStorage.getItem('token')});
     let options = new RequestOptions({ headers: header});

     return this.http.delete(environment.serviceEndpoint + "/pet/" + petId,options)
               .toPromise()
               .then(() => {
                 console.log('Got a response from for deletion Service');
                 return;
               })
              .catch(error =>{
                console.log('error from petservice');
                return Promise.reject('error');
              })
  }
  savePet(petToSave: Pet): Promise <string>{
     let header = new Headers({'Authorization': localStorage.getItem('token')});
     let options = new RequestOptions({ headers: header });
     return this.http.post(environment.serviceEndpoint + "/pet", petToSave,options)
               .toPromise()
               .then((response) => { 
                 return 'success'
               })
              .catch(error =>{
                console.log('error');
                return Promise.reject('error');
              })
  }
}
