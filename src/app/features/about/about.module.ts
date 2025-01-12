import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module'; // Add this
import { AboutComponent } from './components/about.component';
import { AboutMoreComponent } from './components/about-more/about-more.component'; // Add this

@NgModule({
  declarations: [
    AboutComponent,
    AboutMoreComponent  // Add this
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutRoutingModule  // Add this
  ]
})
export class AboutModule { }