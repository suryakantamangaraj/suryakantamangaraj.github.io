import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../../../core/services/navigation/navigation.service';
import { NavigatorComponent } from '../navigator/navigator.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  startTadaAnimation = false;
  showNavigator = false;
  private navigationSubscription!: Subscription;
  private intervalId: any;
  
  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.startTadaAnimation = !this.startTadaAnimation;
    }, 3000);

    this.navigationSubscription = this.navigationService.isNavigatorVisible$
      .subscribe(isVisible => {
        this.showNavigator = isVisible;
      });
  }

  onExploreMeClick() {
    this.navigationService.showNavigator();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}