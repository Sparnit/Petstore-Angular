import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from '../models/pet';
import { Category } from '../models/category';
import { Tag } from '../models/tag';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent {
   form : FormGroup;
    constructor(builder: FormBuilder,private petService: PetService){
      this.form = builder.group({
      'id' : '',  
      'name' : 'Doggie',
      'status' : 'available',
      'url1' : 'http://humanesocietyofcharlotte.org/wp-content/uploads/2013/02/bigstock-Welsh-Corgi-Dog-110298621.jpg',
      'url2' : '',
      'url3' : '',
      'tag1' : '',
      'tag2' : '',
      'cat1' : ''
    });
    }
    petId:number;

    submitForm(formData: any):void{
      let pet : Pet = this.generatePet(formData);
      //will be used for retrieval
      this.petId = pet.id;
      this.petService.savePet(pet).then(message => {
        console.log('savedPet');
        this.notifyCreatedPet(this.petId);
      });
    }

  // Used to send changes to parent
  // tell the parent to render the pet Details view
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();
  notifyCreatedPet(petId: number): void {
    //Emit event to the parent who is subscribed
    this.notify.emit(petId);
  }
    generatePet(formData:any): Pet{
      let pet = new Pet();
      pet.id = formData.id;
      pet.name = formData.name;
      pet.status = formData.status;
      let photoUrl: string [] = []; 
      pet.photoUrls = photoUrl;
      let tags: Tag [] = []; 
      pet.tags = tags;
      for(let i =1 ; i <=3 ;i++){
        //url exists add it
        if(formData['url' + i]){
          photoUrl.push(formData['url' +i]);
        }
      }
      for(let i =1 ; i <=2 ;i++){
        //url exists add it
        if(formData['tag' + i]){
            let tag = new Tag();
            tag.id = i;
            tag.name = formData['tag' +i];
            pet.tags.push(tag);
        }
      }
      if(formData['cat1']){
        let category = new Category()
        category.id = 1;
        category.name = formData['cat1'];
        pet.category = category;
      }
      return pet;
    }
}
