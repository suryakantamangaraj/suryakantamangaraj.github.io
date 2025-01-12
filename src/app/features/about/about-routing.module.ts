import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about.component';
import { AboutMoreComponent } from './components/about-more/about-more.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'aboutmore',
    component: AboutMoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }