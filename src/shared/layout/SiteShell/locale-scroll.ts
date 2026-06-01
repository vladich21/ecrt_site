import { scrollToPosition } from "@/shared/scroll/smooth-scroll";

export const LOCALE_SCROLL_KEY = "ecrt-locale-scroll";

type LocaleScrollPayload = {
  path: string;
  scrollY: number;
};

export function saveLocaleScrollPosition(targetPath: string, scrollY = window.scrollY) {
  const payload: LocaleScrollPayload = { path: targetPath, scrollY };
  sessionStorage.setItem(LOCALE_SCROLL_KEY, JSON.stringify(payload));
}

export function consumeLocaleScrollPosition(currentPath: string): number | null {
  const raw = sessionStorage.getItem(LOCALE_SCROLL_KEY);
  if (raw == null) return null;
  sessionStorage.removeItem(LOCALE_SCROLL_KEY);

  try {
    const payload = JSON.parse(raw) as LocaleScrollPayload;
    if (payload.path !== currentPath || !Number.isFinite(payload.scrollY)) {
      return null;
    }
    return payload.scrollY;
  } catch {
    return null;
  }
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

export function scrollToPageTop() {
  applyScrollPosition(0);
}
