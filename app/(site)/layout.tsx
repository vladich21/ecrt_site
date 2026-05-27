import type { ReactNode } from "react";

import { SiteShell } from "@/shared/layout/SiteShell/SiteShell";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
