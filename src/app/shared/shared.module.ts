import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaxLengthPipe } from './pipes/max-length.pipe';
import { NoEmojiPipe } from './pipes/no-emoji.pipe';
import { EscCancelationDirective } from './directives/esc-cancelation.directive';
import { BackIconComponent } from './components/ui/back-icon/back-icon.component';
import { CrossIconComponent } from './components/ui/cross-icon/cross-icon.component';
import { DpLogoComponent } from './components/dp-logo/dp-logo.component';
import { TypingComponent } from './components/typing/typing.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { KeySkillBtnsComponent } from './components/key-skill-btns/key-skill-btns.component';

@NgModule({
  declarations: [
    MaxLengthPipe,
    NoEmojiPipe,
    EscCancelationDirective,
    BackIconComponent,
    CrossIconComponent,
    DpLogoComponent,
    TypingComponent,
    FooterComponent,
    HeaderComponent,
    ProjectCardComponent,
    KeySkillBtnsComponent,
    CrossIconComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MaxLengthPipe,
    NoEmojiPipe,
    EscCancelationDirective,
    BackIconComponent,
    CrossIconComponent,
    DpLogoComponent,
    TypingComponent,
    FooterComponent,
    HeaderComponent,
    ProjectCardComponent,
    KeySkillBtnsComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CrossIconComponent
  ]
})
export class SharedModule { }