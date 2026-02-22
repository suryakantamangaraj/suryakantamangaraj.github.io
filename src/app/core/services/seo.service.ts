import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private renderer: Renderer2;
  private jsonLdScript: HTMLScriptElement | null = null;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

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

  setJsonLd(schema: any) {
    if (this.jsonLdScript) {
      this.renderer.removeChild(this.document.head, this.jsonLdScript);
    }
    this.jsonLdScript = this.renderer.createElement('script');
    this.renderer.setAttribute(this.jsonLdScript, 'type', 'application/ld+json');
    this.renderer.setProperty(this.jsonLdScript, 'text', JSON.stringify(schema));
    this.renderer.appendChild(this.document.head, this.jsonLdScript);
  }
}
