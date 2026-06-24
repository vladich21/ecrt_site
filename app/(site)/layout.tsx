import type { ReactNode } from "react";

import { ProjectHeroPreload } from "@/shared/images/ProjectHeroPreload";
import { SiteShell } from "@/shared/layout/SiteShell/SiteShell";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProjectHeroPreload />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
