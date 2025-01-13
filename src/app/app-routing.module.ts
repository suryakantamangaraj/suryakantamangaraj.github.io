import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/components/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./features/portfolio/portfolio.module').then((m) => m.PortfolioModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./features/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
