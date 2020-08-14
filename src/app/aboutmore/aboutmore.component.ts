import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutmore',
  templateUrl: './aboutmore.component.html',
  styleUrls: ['./aboutmore.component.scss']
})
export class AboutMoreComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  onBackClick() {
    this.router.navigateByUrl('/');
  }

}
