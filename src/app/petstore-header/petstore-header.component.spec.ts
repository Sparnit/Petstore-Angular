/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginService } from '../login.service'

import { PetstoreHeaderComponent } from './petstore-header.component';

describe('PetstoreHeaderComponent', () => {
  let component: PetstoreHeaderComponent;
  let fixture: ComponentFixture<PetstoreHeaderComponent>;
  let dElem: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    let loginServiceStub = {
      logout(){
        return true;
      }
    };
    TestBed.configureTestingModule({
      declarations: [ PetstoreHeaderComponent ],
      // give a fake login service
      providers:[{provide: LoginService, useValue: loginServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetstoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain a title with text', () => {
     dElem = fixture.debugElement.query(By.css('span'));
     el = dElem.nativeElement;
     expect(el.textContent).toBe('Parnit\'s Pet Shop');
  });
  
   it('should hide links when hideLinks is set to true', () => {
     component.hideLinks = true;
     fixture.detectChanges();
     // only two li items should be returned since the links are disabled
     let elements: DebugElement[] = fixture.debugElement.queryAll(By.css('li'));
     expect(elements.length).toBe(2);
  });

 it('should display all links when hidelinks is false and role is ADMIN', () => {
     component.hideLinks = false;
     component.role = 'ADMIN';
     fixture.detectChanges();
     let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('li'));
     expect(dElements.length).toBe(5);
     expect(dElements[2].nativeElement.firstElementChild.innerHTML).toBe('Listing Page');
     expect(dElements[3].nativeElement.firstElementChild.innerHTML).toBe('Register Pet');
     expect(dElements[4].nativeElement.firstElementChild.innerHTML).toBe('Logout');
  });

  it('should display all links except register pet when not an admin', () => {
     component.hideLinks = false;
     component.role = 'USER';
     fixture.detectChanges();
     let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('li'));
     expect(dElements.length).toBe(4);
  });
});
