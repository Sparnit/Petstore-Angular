/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Pet } from "../models/pet"
import { Category } from "../models/category"
import { Tag } from "../models/tag"

import { PetDetailsComponent } from './pet-details.component';

describe('PetDetailsComponent', () => {
  let component: PetDetailsComponent;
  let fixture: ComponentFixture<PetDetailsComponent>;
  let sampleCategory: Category = {
    id:1,
    name:'cat1'
  };
  let sampleTags: Tag[] =[{id:1,name: 'tag1'},{id:1,name: 'tag2'}];

  let samplePet: Pet = {
    id:1,
    name:'dog',
    category: sampleCategory,
    status: 'available',
    tags: sampleTags,
    photoUrls:['url1','url2']
  }

  beforeEach(async(() => {
    let loginServiceStub = {
      logout(){
        return true;
      }
    };
    TestBed.configureTestingModule({
      declarations: [ PetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should not display anything if no pet is selected', () => {
     component.pet = null;
     fixture.detectChanges();
     // should find nothing since no pet was passed into the component
     let element: DebugElement = fixture.debugElement.query(By.css('h1'));
     expect(element).toBe(null);
  });

 it('should display pet details title', () => {
     component.pet = samplePet;
     fixture.detectChanges();
     let dElements: DebugElement = fixture.debugElement.query(By.css('h1'));
     expect(dElements.nativeNode.innerHTML).toBe('Pet Details');
  });

  it('should display a list of Photos', () => {
     component.pet = samplePet;
     fixture.detectChanges();
     let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('li.photoList'));
     expect(dElements[0].nativeNode.innerHTML).toContain('Picture 1');
     expect(dElements[1].nativeNode.innerHTML).toContain('Picture 2');
  });

  it('should display a list of Photos', () => {
     component.pet = samplePet;
     fixture.detectChanges();
     let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('li.photoList'));
     expect(dElements[0].nativeNode.innerHTML).toContain('Picture 1');
     expect(dElements[1].nativeNode.innerHTML).toContain('Picture 2');
  });

 it('should display a list of Tags', () => {
     component.pet = samplePet;
     fixture.detectChanges();
     let dElements: DebugElement[] = fixture.debugElement.queryAll(By.css('li.categories'));
     expect(dElements[0].nativeNode.innerHTML).toContain('Available with TAG1 tag');
     expect(dElements[1].nativeNode.innerHTML).toContain('Available with TAG2 tag');
  });

  it('should display the pets status in upperCase', () => {
     component.pet = samplePet;
     fixture.detectChanges();
     let dElements: DebugElement = fixture.debugElement.query(By.css('div.status'));
     expect(dElements.nativeNode.innerHTML).toContain('DOG is AVAILABLE');
  });

  it('should change photos when picture 2 is clicked', () => {
     component.pet = samplePet;
     fixture.detectChanges();
     component.changePhoto(samplePet.photoUrls[1]);
     let dElement: DebugElement = fixture.debugElement.query(By.css('img'));
     expect(dElement.nativeNode.src).toContain('url2');
  });
});
