import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/components/landing-page/landing-page.component';
import { AboutComponent } from './features/about/components/about.component';
import { AboutMoreComponent } from './features/about/components/about-more/about-more.component';
import { ContactComponent } from './features/contact/components/contact.component';

const routes: Routes = [
  { 
    path: '', 
    component: LandingPageComponent, 
    pathMatch: 'full' 
  },
  { 
    path: 'about', 
    component: AboutComponent 
  },
  {
    path: 'about/aboutmore',
    component: AboutMoreComponent
  },
  { 
    path: 'portfolio', 
    loadChildren: () => import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  { 
    path: 'contact', 
    component: ContactComponent 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }