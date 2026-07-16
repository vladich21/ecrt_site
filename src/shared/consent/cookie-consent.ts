export const COOKIE_CONSENT_KEY = "ecrt-cookie-consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_CHANGE_EVENT = "ecrt-cookie-consent-change";

export type CookieConsentChoice = {
  version: number;
  analytics: boolean;
  decidedAt: string;
};

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentChoice;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    if (typeof parsed.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return readCookieConsent()?.analytics === true;
}

function emitConsentChange(choice: CookieConsentChoice | null): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: choice }));
}

export function writeCookieConsent(analytics: boolean): CookieConsentChoice {
  const choice: CookieConsentChoice = {
    version: COOKIE_CONSENT_VERSION,
    analytics,
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(choice));
  emitConsentChange(choice);
  return choice;
}

export function clearCookieConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  emitConsentChange(null);
}

export function getPrivacyPolicyUrl(locale: "ru" | "en" = "ru"): string {
  const envUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
  if (envUrl) return envUrl;
  return locale === "en" ? "/en/privacy-policy" : "/privacy-policy";
}
