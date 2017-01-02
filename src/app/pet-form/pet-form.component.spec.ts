/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetFormComponent } from './pet-form.component';
import { PetService } from '../pet.service';
import { Pet } from '../models/pet'

describe('PetFormComponent', () => {
  let component: PetFormComponent;
  let fixture: ComponentFixture<PetFormComponent>;
  let petServiceStub ={
     savePet(petToSave: Pet): Promise <string>{
       return Promise.resolve('success');
     }

  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetFormComponent ],
      providers:[{provide: PetService, useValue: petServiceStub }],
      imports: [FormsModule,ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ten input fields on the form', () => {
     fixture.detectChanges();
     let inputElements: DebugElement[] = fixture.debugElement.queryAll(By.css('div.form-group'));
     expect(inputElements.length).toBe(10);
     expect(inputElements[0].nativeElement.innerHTML).toContain("Pet Identifier (number):");
     expect(inputElements[1].nativeElement.innerHTML).toContain("Pet Name:");
     expect(inputElements[2].nativeElement.innerHTML).toContain("Photo Url 1");
     expect(inputElements[3].nativeElement.innerHTML).toContain("Photo Url 2");
     expect(inputElements[4].nativeElement.innerHTML).toContain("Photo Url 3");
     expect(inputElements[5].nativeElement.innerHTML).toContain("Tag 1");
     expect(inputElements[6].nativeElement.innerHTML).toContain("Tag 2");
     expect(inputElements[7].nativeElement.innerHTML).toContain("Category");
     expect(inputElements[8].nativeElement.innerHTML).toContain("Status");
     expect(inputElements[9].nativeElement.innerHTML).toContain("Submit");
  });

  it('should display three radio buttons on the form', () => {
     fixture.detectChanges();
     let inputElements: DebugElement[] = fixture.debugElement.queryAll(By.css('div.radio'));
     expect(inputElements.length).toBe(3);
     expect(inputElements[0].nativeElement.innerHTML).toContain("Available");
     expect(inputElements[1].nativeElement.innerHTML).toContain("Sold");
     expect(inputElements[2].nativeElement.innerHTML).toContain("Pending");
  });
});
