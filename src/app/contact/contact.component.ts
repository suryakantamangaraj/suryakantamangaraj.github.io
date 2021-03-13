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
        name: 'Instagram',
        url: 'https://www.instagram.com/suryaraj.me/',
        iconUrl: './assets/icons/instagram.svg'
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/suryakantamangaraj/',
        iconUrl: './assets/icons/linkedin.svg'
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/suryaraj.me',
        iconUrl: './assets/icons/facebook.svg'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/_suryaraj_',
        iconUrl: './assets/icons/twitter.svg'
      }
    ],
    work: [
      {
        name: 'Tumblr',
        url: 'https://suryaraj.tumblr.com/',
        iconUrl: './assets/icons/tumblr.svg'
      },
      {
        name: 'Medium',
        url: 'https://surya-raj.medium.com/',
        iconUrl: './assets/icons/medium.svg'
      },
      {
        name: 'Behance',
        url: 'https://www.behance.net/surya_raj',
        iconUrl: './assets/icons/behance.svg'
      },
      {
        name: 'Goodreads',
        url: 'https://www.goodreads.com/user/show/98923939-surya-raj',
        iconUrl: './assets/icons/goodreads.svg'
      }
    ]
  };

  email = {
    name: 'Email',
    url: 'mailto:surya.socialnetworking@gmail.com',
    iconUrl: './assets/icons/email.svg'
  };

  github = {
    name: 'GitHub',
    url: 'https://github.com/suryakantamangaraj',
    iconUrl: './assets/icons/github.svg'
  };
  ngOnInit() {}

  onBackClick() {
    this.router.navigateByUrl('/');
  }
}
