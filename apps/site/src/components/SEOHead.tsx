import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function SEOHead({ title, description, path, image = 'https://piscinao.com/og-image.jpg' }: SEOHeadProps) {
  useEffect(() => {
    document.title = `${title} | Piscinão Araçatuba`;

    const setMetaTag = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', `https://piscinao.com${path}`);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:locale', 'pt_BR');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
  }, [title, description, path, image]);

  return null;
}
