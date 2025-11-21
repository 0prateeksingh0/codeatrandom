import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="description" content="Analyze skill gaps, get personalized career roadmaps, and stay updated with tech news" />
        <meta property="og:title" content="CodeAtRandom AI - Career Path Analyzer" />
        <meta property="og:description" content="Analyze skill gaps, get personalized career roadmaps, and stay updated with tech news" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

