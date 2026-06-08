import { getCopy, type Locale } from "@/content/i18n";

import styles from "./about-page.module.scss";
import { AboutChronologySection } from "./sections/AboutChronologySection";
import { AboutHeroSection } from "./sections/AboutHeroSection";
import { AboutLeadershipSection } from "./sections/AboutLeadershipSection";
import { AboutPillarsSection } from "./sections/AboutPillarsSection";

export function AboutPageView({ locale = "ru" }: { locale?: Locale }) {
  const aboutCopy = getCopy("about", locale);
  const homeCopy = getCopy("home", locale);

  return (
    <div className={styles.aboutRoot}>
      <AboutHeroSection aboutCopy={aboutCopy} />

      <AboutChronologySection homeCopy={homeCopy} />

      <div className={styles.contentShell}>
        <div className={styles.wrap}>
          <AboutPillarsSection aboutCopy={aboutCopy} />
          <AboutLeadershipSection aboutCopy={aboutCopy} />
        </div>
      </div>
    </div>
  );
}
