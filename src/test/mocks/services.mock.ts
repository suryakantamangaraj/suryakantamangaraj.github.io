import { BehaviorSubject } from 'rxjs';

export class NavigationServiceMock {
  private isNavigatorVisibleSubject = new BehaviorSubject<boolean>(false);
  isNavigatorVisible$ = this.isNavigatorVisibleSubject.asObservable();

  toggleNavigator(): void {
    this.isNavigatorVisibleSubject.next(!this.isNavigatorVisibleSubject.value);
  }
}

export const mockProjects = [
  {
    title: 'Test Project',
    description: 'Test Description',
    technologies: ['angular', 'typescript'],
    imageUrl: 'test.jpg',
    sourceUrl: 'https://github.com/test',
  },
];
