/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { RouterModule }   from '@angular/router';
import { HttpModule ,BaseRequestOptions,Http,Response, ResponseOptions, RequestMethod} from  '@angular/http'
import {APP_BASE_HREF} from '@angular/common';
import { MockBackend, MockConnection } from '@angular/http/testing';


describe('LoginService', () => {
  let service: LoginService;
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule, RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/Login',
        pathMatch: 'full'
      }])],
      providers: [LoginService,{provide: APP_BASE_HREF, useValue : '/' }, MockBackend,
      BaseRequestOptions,
      {
      provide: Http,
      useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backendInstance, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },]
    });
  });

  beforeEach(inject([LoginService, MockBackend], (loginService: LoginService, mockBackend: MockBackend) => {
    service = loginService;
    backend = mockBackend;
  }));

  it('should ...', ()  => {
    expect(service).toBeTruthy();
  });

  it('should return a success promise on login', (done)  => {
    backend.connections.subscribe((connection: MockConnection) => {
      let responseBody = new ResponseOptions({
        body: { role: 'ADMIN', token: 'TEST_TOKEN' },
        status: 200
      });
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toContain('/login');
      connection.mockRespond(new Response(responseBody));
    });
    service.login({username: 'admin', password: 'testPassword'}).then((response) =>{
      expect(response.status).toBe(200);
      expect(response._body.role).toBe('ADMIN');
      expect(response._body.token).toBe('TEST_TOKEN');
      done();
    });
  });

  it('should return fail promise on incorrect login', (done)  => {
    let error: Error = new Error('Error');
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockError(error);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toContain('/login');
    });
    service.login({username: 'admin', password: 'testPassword'}).catch((response) =>{
      expect(response).toBe(error);
      done();
    })
  });
});
