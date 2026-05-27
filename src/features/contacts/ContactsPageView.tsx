import { ContactsPageContent } from "./ContactsPageContent";

import styles from "./contacts-page.module.scss";

type Locale = "ru" | "en";

export function ContactsPageView({ locale = "ru" }: { locale?: Locale }) {
  const pageLang = locale === "en" ? "en" : undefined;

  return (
    <div lang={pageLang} className={styles.contactShell}>
      <ContactsPageContent locale={locale} />
    </div>
  );
}
