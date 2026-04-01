import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, ogImage }) {
  const siteName = 'Złota Kareta – Wynajem Aut do Ślubu Radom & Warszawa';
  const baseUrl = 'https://zlota-kareta.pl';
  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical || baseUrl} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical || baseUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="geo.region" content="PL-MZ" />
      <meta name="geo.placename" content="Radom, Warszawa" />
    </Helmet>
  );
}
