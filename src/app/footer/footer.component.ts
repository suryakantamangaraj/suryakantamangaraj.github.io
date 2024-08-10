import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number; // Declare the property here

  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear(); // Initialize the property
  }
}
