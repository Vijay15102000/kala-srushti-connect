import { recipes } from '../src/lib/data.ts'
import { writeFileSync } from 'fs'

const baseUrl = 'https://karnatakaculinary.vercel.app'

const urls = [
  { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
  ...recipes.map(recipe => ({
    loc: `${baseUrl}/recipe/${recipe.id}`,
    priority: '0.8',
    changefreq: 'monthly'
  }))
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

writeFileSync('./public/sitemap.xml', xml)
console.log(`Sitemap generated with ${urls.length} URLs`)
