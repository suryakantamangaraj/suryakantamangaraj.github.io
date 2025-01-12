import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have router outlet', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should have footer', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should trigger animation based on route data', () => {
    const outlet = { activatedRouteData: { animation: 'test' } };
    expect(component.triggerAnimation(outlet)).toBe('test');
  });

  it('should handle null animation data', () => {
    const outlet = { activatedRouteData: {} };
    expect(component.triggerAnimation(outlet)).toBeNull();
  });
});