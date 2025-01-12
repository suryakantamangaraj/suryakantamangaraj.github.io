import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }