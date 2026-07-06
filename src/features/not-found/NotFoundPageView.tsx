import Link from "next/link";

import notFoundAnimation from "../../../public/animations/not-found-404.json";
import trainAnimation from "../../../public/animations/not-found-train.json";
import { getCopy, type Locale } from "@/content/i18n";
import { publicPathForLocale } from "@/content/i18n/routing";

import { LottieAnimation } from "./LottieAnimation";
import styles from "./not-found-page.module.scss";

export function NotFoundPageView({ locale }: { locale: Locale }) {
  const copy = getCopy("common", locale).notFound;

  return (
    <main className={styles.root} aria-labelledby="not-found-title">
      <div className={styles.glow} aria-hidden />
      <section className={styles.card}>
        <LottieAnimation
          className={styles.codeAnimation}
          animationData={notFoundAnimation}
          label={copy.animation404}
        />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title} id="not-found-title">
            {copy.title}
          </h1>
          <p className={styles.lead}>{copy.lead}</p>
        </div>

        <LottieAnimation
          className={styles.trainAnimation}
          animationData={trainAnimation}
          label={copy.animationTrain}
        />

        <div className={styles.actions}>
          <Link className={styles.primaryLink} href={publicPathForLocale(locale, "/")}>
            {copy.homeLink}
          </Link>
          <Link className={styles.secondaryLink} href={publicPathForLocale(locale, "/projects")}>
            {copy.projectsLink}
          </Link>
        </div>
      </section>
    </main>
  );
}
