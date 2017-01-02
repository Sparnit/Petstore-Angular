import { Component, Input } from '@angular/core';
import { Pet } from '../models/pet'

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent {
  @Input()
  pet: Pet
  changePhoto(url: string): void{
    let elem = document.getElementById('img1');
    elem.setAttribute('src',url);
  }
}
