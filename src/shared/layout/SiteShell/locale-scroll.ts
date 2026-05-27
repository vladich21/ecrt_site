import { scrollToPosition } from "@/shared/scroll/smooth-scroll";

export const LOCALE_SCROLL_KEY = "ecrt-locale-scroll";

export function saveLocaleScrollPosition() {
  sessionStorage.setItem(LOCALE_SCROLL_KEY, String(window.scrollY));
}

export function consumeLocaleScrollPosition(): number | null {
  const raw = sessionStorage.getItem(LOCALE_SCROLL_KEY);
  if (raw == null) return null;
  sessionStorage.removeItem(LOCALE_SCROLL_KEY);
  const scrollY = Number(raw);
  return Number.isFinite(scrollY) ? scrollY : null;
}

export function applyScrollPosition(scrollY: number) {
  scrollToPosition(scrollY, { immediate: true });
}

export function restoreLocaleScrollPosition(scrollY: number) {
  applyScrollPosition(scrollY);

  let attempts = 0;
  const timer = window.setInterval(() => {
    if (Math.abs(window.scrollY - scrollY) < 2 || attempts >= 16) {
      window.clearInterval(timer);
      return;
    }
    applyScrollPosition(scrollY);
    attempts += 1;
  }, 50);

  return () => window.clearInterval(timer);
}
