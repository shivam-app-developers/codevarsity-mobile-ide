import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}

/**
 * Google Analytics component
 * Add this to your layout.tsx within the <head> tag
 * Usage: <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
 */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            page_title: document.title,
          });
        `}
      </Script>
    </>
  );
}
