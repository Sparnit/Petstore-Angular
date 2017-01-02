import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { AppComponent } from './app.component';
import { PetService } from './pet.service';
import { LoginService } from './login.service';
import { PetstoreListingPageComponent } from './petstore-listing-page/petstore-listing-page.component';
import { PetListingComponent } from './pet-listing/pet-listing.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { PetstoreHeaderComponent } from './petstore-header/petstore-header.component';
import { PetstorePetRegistrationPageComponent } from './petstore-pet-registration-page/petstore-pet-registration-page.component';
import { PetFormComponent } from './pet-form/pet-form.component';
import { PetstoreLoginPageComponent } from './petstore-login-page/petstore-login-page.component';
import { PetstoreLoginComponent } from './petstore-login/petstore-login.component';
import { AuthGuard } from './authguard';

@NgModule({
  declarations: [
    AppComponent,
    PetstoreListingPageComponent,
    PetListingComponent,
    PetDetailsComponent,
    PetstoreHeaderComponent,
    PetstorePetRegistrationPageComponent,
    PetFormComponent,
    PetstoreLoginPageComponent,
    PetstoreLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/Login',
        pathMatch: 'full'
      },
      {
        path: 'petListing',
        component: PetstoreListingPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'petRegistration',
        component: PetstorePetRegistrationPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Login',
        component: PetstoreLoginPageComponent
      }
    ])
  ],
  providers: [PetService, LoginService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
