import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LocationComponent } from './location/location/location.component';
import { LocationAddEditComponent } from './location/location-add-edit/location-add-edit.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { PlantComponent } from './plant/plant/plant.component';
import { PhotoComponent } from './photo/photo/photo.component';
import { PhotoAddComponent } from './photo/photo-add/photo-add.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { PlantAddComponent } from './plant/plant-add/plant-add.component';
import { PlantEditSoilComponent } from './plant/plant-edit-soil/plant-edit-soil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'user', component: DefaultLayoutComponent,
    children: [
      { path: 'register', component: UserRegisterComponent }
    ]
  },
  {
    path: 'location', component: DefaultLayoutComponent,
    children: [
      { path: '', component: LocationListComponent },
      { path: 'create', component: LocationAddEditComponent },
      { path: 'edit/:locationId', component: LocationAddEditComponent },
      { path: ':locationId', component: LocationComponent },
    ]
  },
  {
    path: 'plant', component: DefaultLayoutComponent,
    children: [
      { path: 'create/:locationId', component: PlantAddComponent },
      { path: 'edit/:plantId', component: PlantAddComponent },
      { path: 'edit/:plantId/soil', component: PlantEditSoilComponent },
      { path: ':plantId', component: PlantComponent },
    ]
  },
  {
    path: 'photo', component: DefaultLayoutComponent,
    children: [
      { path: 'create/:plantId', component: PhotoAddComponent },
      { path: 'edit/:photoId', component: PhotoAddComponent },
      { path: ':photoId', component: PhotoComponent },
    ]
  },
  { path: 'photo/:photoId', component: PhotoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
