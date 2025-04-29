import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ProfileItem {
  name: string;
  url: string;
  iconUrl: string;
}

interface ContactProfile {
  profile: ProfileItem[];
  work: ProfileItem[];
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactProfile: ContactProfile = {
    profile: [
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/suryaraj.me/',
        iconUrl: './assets/icons/contact/instagram.svg'
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/suryakantamangaraj/',
        iconUrl: './assets/icons/contact/linkedin.svg'
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/suryaraj.me',
        iconUrl: './assets/icons/contact/facebook.svg'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/_suryaraj_',
        iconUrl: './assets/icons/contact/twitter.svg'
      }
    ],
    work: [
      {
        name: 'GitHub',
        url: 'https://github.com/suryakantamangaraj',
        iconUrl: './assets/icons/contact/github.svg'
      },
      {
        name: 'Tumblr',
        url: 'https://suryaraj.tumblr.com/',
        iconUrl: './assets/icons/contact/tumblr.svg'
      },
      {
        name: 'Medium',
        url: 'https://surya-raj.medium.com/',
        iconUrl: './assets/icons/contact/medium.svg'
      },
      {
        name: 'Behance',
        url: 'https://www.behance.net/surya_raj',
        iconUrl: './assets/icons/contact/behance.svg'
      }
    ]
  };

  email: ProfileItem = {
    name: 'Email',
    url: 'mailto:surya.socialnetworking@gmail.com',
    iconUrl: './assets/icons/contact/email.svg'
  };

  linktree: ProfileItem = {
    name: 'LinkTree',
    url: 'https://linktr.ee/suryaraj',
    iconUrl: './assets/icons/contact/linktree.svg'
  };

  constructor(private router: Router) {}

  onBackClick(): void {
    this.router.navigate(['/']);
  }
}