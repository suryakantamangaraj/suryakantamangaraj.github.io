import { ComponentFixture } from '@angular/core/testing';

export class TestUtils {
  static setInputValue(fixture: ComponentFixture<unknown>, selector: string, value: string): void {
    const input = fixture.debugElement.nativeElement.querySelector(selector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  static clickElement(fixture: ComponentFixture<unknown>, selector: string): void {
    const element = fixture.debugElement.nativeElement.querySelector(selector);
    element.click();
    fixture.detectChanges();
  }

  static getText(fixture: ComponentFixture<unknown>, selector: string): string {
    return fixture.debugElement.nativeElement.querySelector(selector).textContent.trim();
  }
}
