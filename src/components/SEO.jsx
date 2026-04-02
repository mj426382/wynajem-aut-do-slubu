import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, ogImage, noindex = false }) {
  const siteName = 'AutoDoŚlubu Warszawa & Radom';
  const baseUrl = 'https://autodoslubuwarszawa.pl';
  const defaultOgImage = `${baseUrl}/og-image.jpg`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonical || baseUrl} />

      {/* Open Graph */}
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical || baseUrl} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="AutoDoŚlubu Warszawa & Radom — luksusowe BMW z szoferem" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />

      {/* Geo */}
      <meta name="geo.region" content="PL-MZ" />
      <meta name="geo.placename" content="Radom, Warszawa, Mazowsze" />
      <meta name="geo.position" content="51.4027;21.1471" />
      <meta name="ICBM" content="51.4027, 21.1471" />

      {/* Additional SEO */}
      <meta name="author" content="AutoDoŚlubu Warszawa & Radom" />
      <meta name="language" content="pl" />
    </Helmet>
  );
}
