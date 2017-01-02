import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Pet } from '../models/pet'
import { PetService } from '../pet.service';
@Component({
  selector: 'app-pet-listing',
  templateUrl: './pet-listing.component.html',
  styleUrls: ['./pet-listing.component.css']
})
export class PetListingComponent implements OnInit{
  @Input()
  petsList:[Pet];
  selectedPet:Pet;
  constructor(private petService: PetService) { }
  role:string

  ngOnInit(){
    this.role = localStorage.getItem("role");
  }
  // Used to send changes to parent
  @Output() notify: EventEmitter<Pet> = new EventEmitter<Pet>();
  onSelect(pet: Pet): void {
    this.selectedPet = pet;
    //Emit event to the parent who is subscribed
    this.notify.emit(this.selectedPet);
  }

   delete(id: number): void {
    this.petService.deletePet(id).then(response => 
    {
        let listItem = document.getElementById(id + '');
        listItem.parentNode.removeChild(listItem);
    });
   
  }

}
