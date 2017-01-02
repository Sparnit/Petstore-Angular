/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PetstoreHeaderComponent } from '../petstore-header/petstore-header.component';
import { PetstoreListingPageComponent } from './petstore-listing-page.component';
import { PetDetailsComponent } from '../pet-details/pet-details.component';
import { PetListingComponent } from '../pet-listing/pet-listing.component';
import { LoginService } from '../login.service';
import { PetService } from '../pet.service';
import { Pet } from '../models/pet';
import { Category } from '../models/category';
import { Tag } from '../models/tag';

describe('PetstoreListingPageComponent', () => {
  let component: PetstoreListingPageComponent;
  let fixture: ComponentFixture<PetstoreListingPageComponent>;
  let sampleCategory: Category = {
    id:1,
    name:'cat1'
  };
  let sampleTags: Tag[] =[{id:1,name: 'tag1'},{id:1,name: 'tag2'}];

  let samplePet1: Pet = {
    id:1,
    name:'dog',
    category: sampleCategory,
    status: 'available',
    tags: sampleTags,
    photoUrls:['url1','url2']
  }
  let samplePet2: Pet = {
    id:2,
    name:'dog',
    category: sampleCategory,
    status: 'sold',
    tags: sampleTags,
    photoUrls:['url1','url2']
  }

  beforeEach(async(() => {
     let loginServiceStub = {
       
     };
     localStorage.setItem('role', "ADMIN");
     let petServiceStub = {
       getPets(): Promise <Pet[]>{
         return Promise.resolve([samplePet1, samplePet2]);
       }
     };

    TestBed.configureTestingModule({
      declarations: 
      [ PetstoreListingPageComponent , PetstoreHeaderComponent,
      PetDetailsComponent, PetListingComponent ],
      providers:[ {provide: LoginService, useValue: loginServiceStub },
      {provide: PetService, useValue: petServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetstoreListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header and listing component of the page', () => {
     component.pets = [samplePet1, samplePet2];
     fixture.detectChanges();
     // only two li items should be returned since the links are disabled
     let headerElement: DebugElement = fixture.debugElement.query(By.css('span'));

     expect(headerElement.nativeElement.innerHTML).toBe("Parnit's Pet Shop");
     let petListItems: DebugElement[] = fixture.debugElement.queryAll(By.css('div.contentContainer'));
     expect(petListItems.length).toBe(2);
  });

  it('should bring up the detailsView if simulated selection of pet occurs', () => {
     component.pets = [samplePet1, samplePet2];
     component.onSelectedPetChange(samplePet2);
     fixture.detectChanges();
     // only two li items should be returned since the links are disabled
     let headerElement: DebugElement = fixture.debugElement.query(By.css('span'));

     expect(headerElement.nativeElement.innerHTML).toBe("Parnit's Pet Shop");
     let petListItems: DebugElement[] = fixture.debugElement.queryAll(By.css('div.contentContainer'));
     expect(petListItems.length).toBe(2);
     let petDetailsItem: DebugElement = fixture.debugElement.query(By.css('div.status'));
     expect(petDetailsItem.nativeElement.innerHTML).toContain('SOLD');
  });
});
