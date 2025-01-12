import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './components/portfolio.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortfolioRoutingModule
  ]
})
export class PortfolioModule { }