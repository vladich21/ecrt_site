"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

import {
  consumeLocaleScrollPosition,
  restoreLocaleScrollPosition,
  scrollToPageTop,
} from "./locale-scroll";

/** Restores scroll after locale switch; scrolls to top on normal navigation. */
export function SiteScrollRestore() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const scrollY = consumeLocaleScrollPosition(pathname);
    if (scrollY != null) {
      return restoreLocaleScrollPosition(scrollY);
    }

    if (!window.location.hash) {
      scrollToPageTop();
    }
  }, [pathname]);

  return null;
}
