declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const DEFAULT_GA_MEASUREMENT_ID = 'G-N2HNT6MX7X';

const GA_MEASUREMENT_ID = (
  import.meta.env.VITE_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID
).trim();

function isValidMeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]{4,}$/i.test(id);
}

export function initGoogleAnalytics(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (!isValidMeasurementId(GA_MEASUREMENT_ID)) {
    return;
  }

  const existingScript = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`
  );
  if (existingScript) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    GA_MEASUREMENT_ID
  )}`;
  script.setAttribute('data-ga-id', GA_MEASUREMENT_ID);
  document.head.appendChild(script);
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('event', eventName, params);
}
