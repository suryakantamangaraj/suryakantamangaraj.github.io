import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavigatorComponent } from './components/navigator/navigator.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    NavigatorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [NavigatorComponent]
})
export class LandingModule { }