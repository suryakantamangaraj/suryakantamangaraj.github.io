const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://suryaraj.com';

const routes = [
    '/',
    '/about',
    '/portfolio',
    '/contact'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
`).join('')}
</urlset>`;

// Ensure output is correct for the prerender directory
const distPath = path.join(__dirname, '../dist/SuryaRaj/browser');

if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap.trim());
console.log('✅ sitemap.xml successfully generated at: ' + distPath + '/sitemap.xml');
