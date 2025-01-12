import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'portfolio',
        loadChildren: () => import('../portfolio/portfolio.module').then(m => m.PortfolioModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }