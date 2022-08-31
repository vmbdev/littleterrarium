import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LocationComponent } from './location/location/location.component';
import { PlantComponent } from './plant/plant/plant.component';
import { PhotoComponent } from './photo/photo/photo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'location/:locationId', component: LocationComponent },
  { path: 'plant/:plantId', component: PlantComponent },
  { path: 'photo/:photoId', component: PhotoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
