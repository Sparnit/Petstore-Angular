import { Component } from '@angular/core';
import { Pet} from '../models/pet';
import { PetService} from '../pet.service';
@Component({
  selector: 'app-petstore-pet-registration-page',
  templateUrl: './petstore-pet-registration-page.component.html',
  styleUrls: ['./petstore-pet-registration-page.component.css']
})
export class PetstorePetRegistrationPageComponent {
  createdPet: Pet;
  constructor(private petService: PetService) { }

  onPetCreation(petId: number): void {
    this.petService.getPet(petId).then(pet => {
    this.createdPet = pet
    setTimeout(function () {
       window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
  });
  }
}
