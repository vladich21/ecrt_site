import type { Locale } from "@/content/i18n";

import { ContactsPageContent } from "./ContactsPageContent";

import styles from "./contacts-page.module.scss";

export function ContactsPageView({ locale = "ru" }: { locale?: Locale }) {
  return (
    <div className={styles.contactShell}>
      <ContactsPageContent locale={locale} />
    </div>
  );
}
