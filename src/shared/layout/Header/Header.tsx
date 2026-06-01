"use client";

import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import brandLogo from "@/assets/presentation/logo.webp";
import { navItems } from "@/data/ecrtSite";
import { heroPreloadHandlers } from "@/shared/images/route-hero-images";
import { LanguageSwitcher } from "@/shared/ui/LanguageSwitcher/LanguageSwitcher";

import { localeFromPathname, t, withLocalePath } from "../SiteShell/site-shell-utils";
import { setSmoothScrollPaused } from "@/shared/scroll/smooth-scroll";
import styles from "./header.module.scss";

const CSS_HEADER_HEIGHT_VAR = "--header-slot";
const SCROLL_TOP_PIN_PX = 48;
const SCROLL_DIRECTION_THRESHOLD_PX = 8;
const MOBILE_HEADER_PIN_MQ = "(max-width: 768px)";

function publishHeaderHeightToCss(headerRoot: HTMLElement) {
  const measured = Math.round(headerRoot.getBoundingClientRect().height);
  const cssBaseline = Math.round(
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-slot")) || measured,
  );
  const nextHeight = Math.max(measured, cssBaseline);

  const currentRaw = getComputedStyle(document.documentElement).getPropertyValue("--header-slot");
  const currentHeight = Math.round(parseFloat(currentRaw) || cssBaseline);
  if (Math.abs(nextHeight - currentHeight) < 2) return;

  document.documentElement.style.setProperty(CSS_HEADER_HEIGHT_VAR, `${nextHeight}px`);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={styles.menuIcon}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M6 6l12 12M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const isHomePage = pathname === "/" || pathname === "/en";
  const [scrollY, setScrollY] = useState(0);
  const [scrollRetracted, setScrollRetracted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const previousScrollY = useRef(0);
  const headerRootRef = useRef<HTMLElement | null>(null);
  const brandLines = t("header.brandLines", locale).split("\n");
  const mobileNavId = "site-mobile-nav";

  useLayoutEffect(() => {
    const headerRoot = headerRootRef.current;
    if (!headerRoot) return;

    const sync = () => publishHeaderHeightToCss(headerRoot);
    sync();
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(headerRoot);
    window.addEventListener("resize", sync);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  useLayoutEffect(() => {
    previousScrollY.current = window.scrollY;
    setScrollY(previousScrollY.current);
    setScrollRetracted(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mobileMq = window.matchMedia(MOBILE_HEADER_PIN_MQ);

    const onScroll = () => {
      const nextScrollY = window.scrollY;
      setScrollY(nextScrollY);

      if (mobileMq.matches) {
        setScrollRetracted(false);
        previousScrollY.current = nextScrollY;
        return;
      }

      if (nextScrollY <= SCROLL_TOP_PIN_PX) {
        setScrollRetracted(false);
      } else if (nextScrollY > previousScrollY.current + SCROLL_DIRECTION_THRESHOLD_PX) {
        setScrollRetracted(true);
      } else if (nextScrollY < previousScrollY.current - SCROLL_DIRECTION_THRESHOLD_PX) {
        setScrollRetracted(false);
      }

      previousScrollY.current = nextScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    setSmoothScrollPaused(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      setSmoothScrollPaused(false);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1441px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  const pinnedToViewportTop = scrollY <= SCROLL_TOP_PIN_PX;
  const pinnedHero = isHomePage && pinnedToViewportTop && !scrollRetracted;
  const useDarkHeader = pinnedHero;
  const headerRetracted = scrollRetracted && !menuOpen;
  const surfaceClass = headerRetracted ? "" : useDarkHeader ? styles.headerHero : styles.headerSolid;
  const headerClassName = [
    styles.header,
    headerRetracted ? styles.headerRetracted : "",
    menuOpen ? styles.headerMenuOpen : "",
    surfaceClass,
  ]
    .filter(Boolean)
    .join(" ");

  const navLinks = navItems.map((item) => {
    const href = withLocalePath(item.href, locale);
    const isActive = pathname === href || (href !== "/" && href !== "/en" && pathname.startsWith(`${href}/`));
    return (
      <Link
        key={item.href}
        href={href}
        className={isActive ? styles.navLinkActive : undefined}
        onClick={closeMenu}
        {...heroPreloadHandlers(item.href)}
      >
        {t(item.labelKey, locale)}
      </Link>
    );
  });

  return (
    <header ref={headerRootRef} className={headerClassName}>
      <div className={styles.container}>
        <Link href={locale === "en" ? "/en" : "/"} className={styles.brand} aria-label={t("a11y.brandHome", locale)}>
          <span className={styles.brandMark} aria-hidden>
            <AssetImage src={brandLogo} alt="" width={72} height={72} className={styles.brandMarkImg} sizes="72px" priority />
          </span>
          <span className={styles.brandText}>
            {brandLines.map((line) => (
              <span key={line} className={styles.brandTextLine}>
                {line}
              </span>
            ))}
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label={t("a11y.mainNav", locale)}>
          {navLinks}
        </nav>

        <div className={styles.actions}>
          <div className={styles.langDock}>
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls={mobileNavId}
            aria-label={menuOpen ? t("a11y.closeMenu", locale) : t("a11y.openMenu", locale)}
            onClick={toggleMenu}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={menuOpen ? styles.backdropVisible : styles.backdrop}
        aria-label={t("a11y.closeMenu", locale)}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <nav
        id={mobileNavId}
        className={menuOpen ? `${styles.mobileNav} ${styles.mobileNavOpen}` : styles.mobileNav}
        aria-label={t("a11y.mainNav", locale)}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileNavInner}>
          {navLinks}
          <div className={styles.mobileLangDock}>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
