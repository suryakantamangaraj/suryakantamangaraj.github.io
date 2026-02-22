import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: false,
})
export class LandingPageComponent implements OnInit, OnDestroy {
  startTadaAnimation = false;
  showNavigator = false;
  private navigationSubscription!: Subscription;
  private intervalId: any;

  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.startTadaAnimation = !this.startTadaAnimation;
    }, 3000);

    this.navigationSubscription = this.navigationService.isNavigatorVisible$.subscribe(
      (isVisible) => {
        this.showNavigator = isVisible;
      }
    );

    this.seoService.updateSeoTags({
      title: 'Surya Raj | AI-Driven RF System Design & Test Automation',
      description:
        'Bridging the gap between complex hardware and intelligent software. Specializing in RF system design, wireless communications, and AI/ML test automation.',
      ogImage: 'https://suryaraj.com/assets/images/dp.png', // Fallback to your main DP or any other preview image
      ogUrl: 'https://suryaraj.com/',
    });

    // Inject Schema.org JSON-LD Entity
    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: 'Surya Raj',
          jobTitle: 'AI-Driven RF System Designer & Test Automation Engineer',
          description:
            'Bridging the gap between complex hardware and intelligent software. Specializing in RF system design, wireless communications, and AI/ML test automation.',
          url: 'https://suryaraj.com/',
          image: 'https://suryaraj.com/assets/images/dp.png',
          sameAs: [
            'https://www.linkedin.com/in/suryakanta-mangaraj',
            'https://github.com/suryakantamangaraj',
          ],
        },
        {
          '@type': 'WebSite',
          name: 'Surya Raj',
          url: 'https://suryaraj.com/',
        },
      ],
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
