/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { PetstoreLoginComponent } from './petstore-login.component';
import {APP_BASE_HREF} from '@angular/common';
import { PetListingComponent } from '../pet-listing/pet-listing.component';
import { LoginService } from '../login.service';

describe('PetstoreLoginComponent', () => {
  let component: PetstoreLoginComponent;
  let fixture: ComponentFixture<PetstoreLoginComponent>;

  beforeEach(async(() => {
     let loginServiceStub = {
      logout(){
        return true;
      }
    };

    TestBed.configureTestingModule({
      declarations: [ PetstoreLoginComponent, PetListingComponent],
      providers:[{provide: APP_BASE_HREF, useValue : '/' }
      ,{provide: LoginService, useValue: loginServiceStub }],
      imports: [FormsModule,ReactiveFormsModule, RouterModule.forRoot([
      {
        path: 'Login',
        component: PetstoreLoginComponent
      }])],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetstoreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should display three input fields on the form', () => {
     fixture.detectChanges();
     // only two li items should be returned since the links are disabled
     let inputElements: DebugElement[] = fixture.debugElement.queryAll(By.css('div.form-group'));
     expect(inputElements.length).toBe(3);
     expect(inputElements[0].nativeElement.innerHTML).toContain("Username");
     expect(inputElements[1].nativeElement.innerHTML).toContain("Password");
     expect(inputElements[2].nativeElement.innerHTML).toContain("Next");
  });
});
