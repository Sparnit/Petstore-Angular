/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PetService } from './pet.service';
import { HttpModule, BaseRequestOptions, Http, Response, ResponseOptions, RequestMethod } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Pet } from './models/pet';
import { Category } from './models/category';
import { Tag } from './models/tag';


describe('PetService', () => {
  let service: PetService;
  let backend: MockBackend;

  let sampleCategory: Category = {
    id: 1,
    name: 'cat1'
  };
  let sampleTags: Tag[] = [{ id: 1, name: 'tag1' }, { id: 1, name: 'tag2' }];

  let samplePet1: Pet = {
    id: 1,
    name: 'dog',
    category: sampleCategory,
    status: 'available',
    tags: sampleTags,
    photoUrls: ['url1', 'url2']
  }
  let samplePet2: Pet = {
    id: 2,
    name: 'dog',
    category: sampleCategory,
    status: 'sold',
    tags: sampleTags,
    photoUrls: ['url1', 'url2']
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PetService, MockBackend,
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

  beforeEach(inject([PetService, MockBackend], (petService: PetService, mockBackend: MockBackend) => {
    service = petService;
    backend = mockBackend;
    localStorage.setItem('token', 'FAKE_TOKEN');
  }));

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should return a pet object promise on successful retrieval by Id', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let responseBody = new ResponseOptions({
        body: samplePet1,
        status: 200
      });
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toContain('/pet/1');
      expect(connection.request.headers.get('Authorization')).toEqual('FAKE_TOKEN');
      connection.mockRespond(new Response(responseBody));
    });
    service.getPet(1).then((response) => {
      expect(response.status).toBe(samplePet1.status);
      expect(response.name).toBe(samplePet1.name);
      expect(response.name).toBe(samplePet1.name);
      expect(response.category).toBe(samplePet1.category);
      expect(response.tags).toBe(samplePet1.tags);
      done();
    });
  });

  it('should return a rejected promise on a bad request to get pet by id service', (done) => {
    let error: Error = new Error('Error');
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockError(error);
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toContain('/pet/1');
    });
    service.getPet(1).catch((response) => {
      expect(response).toBe('error');
      done();
    })
  });

  it('should return a successful promise on successful deletion by Id', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let responseBody = new ResponseOptions({
        status: 200
      });
      expect(connection.request.method).toEqual(RequestMethod.Delete);
      expect(connection.request.url).toContain('/pet/1');
      expect(connection.request.headers.get('Authorization')).toEqual('FAKE_TOKEN');
      connection.mockRespond(new Response(responseBody));
    });
    service.deletePet(1).then((response) => {
      expect(response).toBe(undefined);
      done();
    });
  });

  it('should return a rejected promise on a bad request to delete pet by id service', (done) => {
    let error: Error = new Error('Error');
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockError(error);
      expect(connection.request.method).toEqual(RequestMethod.Delete);
      expect(connection.request.url).toContain('/pet/1');
    });
    service.deletePet(1).catch((response) => {
      expect(response).toBe('error');
      done();
    })
  });

  it('should return a successful promise with Pet Array object on successful get all Pets', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let responseBody = new ResponseOptions({
        status: 200,
        body: [samplePet1, samplePet2],
      });
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toContain('/pet/all');
      expect(connection.request.headers.get('Authorization')).toEqual('FAKE_TOKEN');
      connection.mockRespond(new Response(responseBody));
    });
    service.getPets().then((response) => {
      expect(response.length).toBe(2);
      expect(response[0]).toBe(samplePet1);
      expect(response[1]).toBe(samplePet2);
      done();
    });
  });

  it('should return a rejected promise on a bad request to delete pet by id service', (done) => {
    let error: Error = new Error('Error');
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockError(error);
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toContain('/pet/all');
    });
    service.getPets().catch((response) => {
      expect(response).toBe('error');
      done();
    })
  });

  it('should return a successful promise on post of a Pet', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let responseBody = new ResponseOptions({
        status: 201,
      });
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toContain('/pet');
      expect(connection.request.headers.get('Authorization')).toEqual('FAKE_TOKEN');
      connection.mockRespond(new Response(responseBody));
    });
    service.savePet(samplePet1).then((response) => {
      expect(response).toBe('success');
      done();
    });
  });

  it('should return a rejected promise on a bad request to posta pet', (done) => {
    let error: Error = new Error('Error');
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockError(error);
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toContain('/pet');
    });
    service.savePet(samplePet1).catch((response) => {
      expect(response).toBe('error');
      done();
    })
  });

});
