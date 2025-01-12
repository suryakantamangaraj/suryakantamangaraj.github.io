import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { GlobalErrorHandler } from './core/services/error/error-handler.service';
import { LandingModule } from './features/landing/landing.module';
import { AboutModule } from './features/about/about.module';
import { PortfolioModule } from './features/portfolio/portfolio.module';
import { ContactModule } from './features/contact/contact.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LandingModule,
    AboutModule,
    PortfolioModule,
    ContactModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }