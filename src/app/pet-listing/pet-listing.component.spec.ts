/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PetService } from '../pet.service';
import { Pet } from '../models/pet';
import { Category } from '../models/category';
import { Tag } from '../models/tag';

import { PetListingComponent } from './pet-listing.component';

describe('PetListingComponent', () => {
  let component: PetListingComponent;
  let fixture: ComponentFixture<PetListingComponent>;
  let sampleCategory: Category = {
    id: 1,
    name: 'cat1'
  };
  let sampleTags: Tag[] = [{ id: 1, name: 'tag1' }, { id: 1, name: 'tag2' }];
  let petServiceStub = {
    deletePet(petId: number): Promise<any> {
      return Promise.resolve();
    }
  };
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
    name: 'cat',
    category: sampleCategory,
    status: 'sold',
    tags: sampleTags,
    photoUrls: ['url1', 'url2']
  }

  beforeEach(async(() => {
    localStorage.setItem('role', "ADMIN");
    TestBed.configureTestingModule({
      declarations: [PetListingComponent],
      providers: [{ provide: PetService, useValue: petServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an All pets title', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.innerHTML).toBe("All Pets");
  });

  it('should display a list of all pets', () => {
    component.petsList = [samplePet1, samplePet2];
    component.role = 'ADMIN';
    fixture.detectChanges();
    let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('div.contentContainer'));
    expect(dElements.length).toBe(2);
  });

  it('should display pet names and status extracted from the list of pets', () => {
    component.petsList = [samplePet1, samplePet2];
    component.role = 'ADMIN';
    fixture.detectChanges();
    let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('span.description'));
    expect(dElements[0].nativeElement.innerHTML).toContain("DOG");
    expect(dElements[0].nativeElement.innerHTML).toContain("AVAILABLE");
    expect(dElements[1].nativeElement.innerHTML).toContain("CAT");
    expect(dElements[1].nativeElement.innerHTML).toContain("SOLD");
  });

  it('should have delete buttons if role is ADMIN', () => {
    component.petsList = [samplePet1, samplePet2];
    component.role = 'ADMIN';
    fixture.detectChanges();
    let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('img.delete'));
    expect(dElements.length).toBe(2);
  });

  it('should not have delete buttons if role is USER', () =>{
    component.petsList = [samplePet1, samplePet2];
    component.role = 'USER';
    fixture.detectChanges();
    let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('img.delete'));
    expect(dElements.length).toBe(0);
  });

});
