import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './components/portfolio.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent
  },
  {
    path: 'project/:id',
    component: ProjectDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }