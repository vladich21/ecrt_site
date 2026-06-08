import Link from "next/link";

import notFoundAnimation from "../../../public/animations/not-found-404.json";
import trainAnimation from "../../../public/animations/not-found-train.json";

import { LottieAnimation } from "./LottieAnimation";
import styles from "./not-found-page.module.scss";

export function NotFoundPageView() {
  return (
    <main className={styles.root} aria-labelledby="not-found-title">
      <div className={styles.glow} aria-hidden />
      <section className={styles.card}>
        <LottieAnimation
          className={styles.codeAnimation}
          animationData={notFoundAnimation}
          label="Анимация ошибки 404"
        />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Маршрут не найден</p>
          <h1 className={styles.title} id="not-found-title">
            Страница ушла с пути
          </h1>
          <p className={styles.lead}>
            Похоже, адрес изменился или был введён с ошибкой. Вернитесь на главную
            страницу или перейдите к проектам.
          </p>
        </div>

        <LottieAnimation
          className={styles.trainAnimation}
          animationData={trainAnimation}
          label="Анимация поезда"
        />

        <div className={styles.actions}>
          <Link className={styles.primaryLink} href="/">
            На главную
          </Link>
          <Link className={styles.secondaryLink} href="/projects">
            Смотреть проекты
          </Link>
        </div>
      </section>
    </main>
  );
}
