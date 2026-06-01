/** Медленное соединение или режим экономии трафика — не грузим лишнее заранее. */
export function shouldLimitPreload(): boolean {
  if (typeof window === "undefined") return false;

  const connection = (
    navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    }
  ).connection;

  if (connection?.saveData) return true;

  const type = connection?.effectiveType;
  return type === "slow-2g" || type === "2g" || type === "3g";
}

export function scheduleIdleWork(task: () => void): void {
  if (typeof window === "undefined") return;

  const win = window as Window & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  };

  if (win.requestIdleCallback) {
    win.requestIdleCallback(() => task(), { timeout: 4000 });
    return;
  }

  setTimeout(task, 1200);
}
