import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { SharedModule } from '../../shared/shared.module';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCardComponent,
    NavigationMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [
    ProfileComponent,
    NavigationMenuComponent
  ]
})
export class ProfileModule { }