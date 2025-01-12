import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackIconComponent } from './components/ui/back-icon/back-icon.component';
import { DpLogoComponent } from './components/dp-logo/dp-logo.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@NgModule({
  declarations: [
    BackIconComponent,
    DpLogoComponent,
    FooterComponent,
    HeaderComponent,
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BackIconComponent,
    DpLogoComponent,
    FooterComponent,
    HeaderComponent,
    ProjectCardComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
    ]
})
export class SharedModule { }