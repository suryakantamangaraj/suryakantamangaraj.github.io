import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  constructor(private router: Router) {}

  contactProfile = {
    profile: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/suryaraj.fb',
        iconUrl: './assets/icons/facebook.svg'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/_suryaraj_',
        iconUrl: './assets/icons/twitter.svg'
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/suryaraj.ig/',
        iconUrl: './assets/icons/instagram.svg'
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/suryakantamangaraj/',
        iconUrl: './assets/icons/linkedin.svg'
      }
    ],
    work: [
      {
        name: 'GitHub',
        url: 'https://github.com/suryakantamangaraj',
        iconUrl: './assets/icons/github.svg'
      },
      {
        name: 'Hackerrank',
        url: 'https://www.hackerrank.com/_suryaraj_',
        iconUrl: './assets/icons/hackerrank.svg'
      },
      {
        name: 'Stackoverflow',
        url: 'https://stackoverflow.com/story/suryaraj',
        iconUrl: './assets/icons/stackoverflow.svg'
      },
      {
        name: 'Pluralsight',
        url: 'https://pluralsight.com/profile/suryaraj',
        iconUrl: './assets/icons/pluralsight.svg'
      }
    ]
  };

  email = {
    name: 'Email',
    url: 'mailto:surya.socialnetworking@gmail.com',
    iconUrl: './assets/icons/email.svg'
  };

  vscodeMarketplace = {
    name: 'VSCode Extension Publisher',
    url: 'https://marketplace.visualstudio.com/publishers/',
    iconUrl: './assets/icons/vscode.svg'
  };
  ngOnInit() {}

  onBackClick() {
    this.router.navigateByUrl('/');
  }
}
