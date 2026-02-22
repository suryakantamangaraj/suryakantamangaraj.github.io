import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  updateSeoTags(config: {
    title: string;
    description: string;
    ogImage?: string;
    ogUrl?: string;
    twitterCard?: string;
  }) {
    // 1. Title
    this.titleService.setTitle(config.title);

    // 2. Meta Description
    this.updateTag('description', config.description);

    // 3. Open Graph (OG) Tags
    this.updateProperty('og:title', config.title);
    this.updateProperty('og:description', config.description);
    if (config.ogImage) {
      this.updateProperty('og:image', config.ogImage);
    }
    if (config.ogUrl) {
      this.updateProperty('og:url', config.ogUrl);
    }

    // 4. Twitter Card Tags
    this.updateTag('twitter:title', config.title);
    this.updateTag('twitter:description', config.description);
    this.updateTag('twitter:card', config.twitterCard || 'summary_large_image');
    if (config.ogImage) {
      this.updateTag('twitter:image', config.ogImage);
    }
  }

  private updateTag(name: string, content: string) {
    this.metaService.updateTag({ name, content });
  }

  private updateProperty(property: string, content: string) {
    this.metaService.updateTag({ property, content });
  }
}
