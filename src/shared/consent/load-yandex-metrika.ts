declare global {
  interface Window {
    ym?: YandexMetrikaFn & { a?: unknown[]; l?: number };
  }
}

type YandexMetrikaFn = ((counterId: number, method: string, ...args: unknown[]) => void) & {
  a?: unknown[];
  l?: number;
};

let metrikaLoaded = false;

export function loadYandexMetrika(counterId: string) {
  if (typeof window === "undefined" || metrikaLoaded) return;

  const numericId = Number(counterId);
  if (!Number.isFinite(numericId)) return;

  metrikaLoaded = true;

  (function initMetrika(id: number) {
    const ymFn = function (...args: unknown[]) {
      (ymFn.a = ymFn.a || []).push(args);
    } as YandexMetrikaFn;
    ymFn.a = [];
    ymFn.l = Date.now();
    window.ym = ymFn;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(script);

    window.ym(id, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  })(numericId);
}
