declare global {
  interface Window {
    ym?: YandexMetrikaFn & { a?: unknown[]; l?: number };
  }
}

type YandexMetrikaFn = ((counterId: number, method: string, ...args: unknown[]) => void) & {
  a?: unknown[];
  l?: number;
};

let loaded = false;

export function getYandexMetrikaCounterId(): string | null {
  const raw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
  return raw || null;
}

/** Loads Yandex.Metrica once after cookie consent. No-op if ID is missing. */
export function initYandexMetrika(): void {
  if (typeof window === "undefined" || loaded) return;

  const counterId = getYandexMetrikaCounterId();
  if (!counterId) return;

  const numericId = Number(counterId);
  if (!Number.isFinite(numericId)) return;

  loaded = true;

  const ymFn = function (...args: unknown[]) {
    (ymFn.a = ymFn.a || []).push(args);
  } as YandexMetrikaFn;
  ymFn.a = [];
  ymFn.l = Date.now();
  window.ym = ymFn;

  const scriptSrc = `https://mc.yandex.ru/metrika/tag.js?id=${numericId}`;
  const existing = Array.from(document.scripts).some((node) => node.src === scriptSrc);
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptSrc;
    const first = document.getElementsByTagName("script")[0];
    if (first?.parentNode) {
      first.parentNode.insertBefore(script, first);
    } else {
      document.head.appendChild(script);
    }
  }

  window.ym(numericId, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}
