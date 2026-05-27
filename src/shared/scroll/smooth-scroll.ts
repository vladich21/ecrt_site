import type Lenis from "lenis";

type ScrollToOptions = {
  immediate?: boolean;
};

let lenisInstance: Lenis | null = null;
const lenisReadyListeners = new Set<(lenis: Lenis) => void>();

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
  if (instance) {
    lenisReadyListeners.forEach((listener) => listener(instance));
  }
}

export function getLenis() {
  return lenisInstance;
}

export function whenLenisReady(listener: (lenis: Lenis) => void): () => void {
  if (lenisInstance) {
    listener(lenisInstance);
    return () => {};
  }

  lenisReadyListeners.add(listener);
  return () => lenisReadyListeners.delete(listener);
}

export function scrollToPosition(y: number, options?: ScrollToOptions) {
  if (lenisInstance) {
    lenisInstance.scrollTo(y, { immediate: options?.immediate ?? false });
    return;
  }

  window.scrollTo({ top: y, left: 0, behavior: options?.immediate ? "instant" : "auto" });
}

export function setSmoothScrollPaused(paused: boolean) {
  if (!lenisInstance) return;
  if (paused) lenisInstance.stop();
  else lenisInstance.start();
}

export function subscribeSmoothScroll(callback: () => void): () => void {
  const lenis = lenisInstance;
  if (lenis) {
    lenis.on("scroll", callback);
    return () => lenis.off("scroll", callback);
  }

  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
