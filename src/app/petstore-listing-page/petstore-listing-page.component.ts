import { Component, OnInit } from '@angular/core';
import { Pet } from '../models/pet'
import { PetService } from '../pet.service';

@Component({
  selector: 'app-petstore-listing-page',
  templateUrl: './petstore-listing-page.component.html',
  styleUrls: ['./petstore-listing-page.component.css']
})

export class PetstoreListingPageComponent implements OnInit{
  pets: Pet[];
  selectedPet: Pet;
  constructor(private petService: PetService) { }
  /**
   * waits for a message from the child component
   * its subscribed to an eventemitter
   */
  onSelectedPetChange(pet: Pet): void {
    this.selectedPet = pet;
     setTimeout(function () {
       window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  }

  ngOnInit(): void {
    this.petService.getPets().then(pets => this.pets = pets);
  }
 
}
