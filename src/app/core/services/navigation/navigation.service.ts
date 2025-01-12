import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private isNavigatorVisibleSource = new BehaviorSubject<boolean>(false);
  isNavigatorVisible$ = this.isNavigatorVisibleSource.asObservable();

  showNavigator() {
    this.isNavigatorVisibleSource.next(true);
  }

  hideNavigator() {
    this.isNavigatorVisibleSource.next(false);
  }

  toggleNavigator() {
    const currentValue = this.isNavigatorVisibleSource.value;
    this.isNavigatorVisibleSource.next(!currentValue);
  }
}