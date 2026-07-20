export const PAGE_SEO = {
  home: {
    ru: {
      title: "Инжиниринговый центр железнодорожного транспорта",
      description:
        "АО ИЦ ЖТ: проектирование высокоскоростных поездов первого отечественного высокоскоростного электропоезда, первая линия ВСМ Москва — Санкт-Петербург, контактная сеть, путь и инфраструктура для железных дорог России.",
    },
    en: {
      title: "ECRT — Railway Engineering | ECRT",
      description:
        "Engineering center of railway transport: EVS-360 high-speed train, first HSR line Moscow – Saint Petersburg, catenary, track and railway infrastructure R&D in Russia.",
    },
  },
  about: {
    ru: {
      title: "О нас — АО ИЦ ЖТ | ECRT",
      description:
        "О компании АО ИЦ ЖТ: инжиниринг подвижного состава и инфраструктуры, команда в Сколково, проекты ВСМ, первый отечественный высокоскоростной электропоезд и импортозамещение для железных дорог.",
    },
    en: {
      title: "About — ECRT",
      description:
        "About ECRT: rolling stock and rail infrastructure engineering, Skolkovo team, HSR programmes, EVS-360 and import substitution for railways.",
    },
  },
  projects: {
    ru: {
      title: "Проекты — АО ИЦ ЖТ | ECRT",
      description:
        "Проекты АО ИЦ ЖТ: первый отечественный высокоскоростной электропоезд, первая линия ВСМ Москва — Санкт-Петербург, путь V2.5, контактная сеть КС-400, малоинтенсивные линии и инженерные программы для РЖД.",
    },
    en: {
      title: "Projects — ECRT",
      description:
        "ECRT projects: EVS-360, first HSR line Moscow – Saint Petersburg, Track V2.5, KS-400 catenary, low-intensity lines and engineering programmes for Russian Railways.",
    },
  },
  careers: {
    ru: {
      title: "Карьера — АО ИЦ ЖТ | ECRT",
      description:
        "Карьера в АО ИЦ ЖТ: вакансии квалифицированных инженеров и программистов в проектах высокоскоростного транспорта и железнодорожной инфраструктуры.",
    },
    en: {
      title: "Careers — ECRT",
      description:
        "Careers at ECRT: opportunities for qualified engineers and programmers in high-speed rail and railway infrastructure programmes.",
    },
  },
  purchase: {
    ru: {
      title: "Закупки — АО ИЦ ЖТ | ECRT",
      description:
        "Закупки АО ИЦ ЖТ: информация о закупочной деятельности, площадки ЕИС и РТС, требования к участникам и правила конкурентных процедур.",
    },
    en: {
      title: "Procurement — ECRT",
      description:
        "ECRT procurement: purchasing policy, EIS and RTS platforms, supplier requirements and competitive procedure rules.",
    },
  },
  documents: {
    ru: {
      title: "Документация — АО ИЦ ЖТ | ECRT",
      description:
        "Официальная документация АО ИЦ ЖТ: уставные документы, отчетность, материалы для партнеров и публикации инжинирингового центра.",
    },
    en: {
      title: "Documents — ECRT",
      description:
        "Official ECRT documents: charter materials, reporting, partner publications and engineering center disclosures.",
    },
  },
  contacts: {
    ru: {
      title: "Обратная связь — АО ИЦ ЖТ | ECRT",
      description:
        "Контакты АО ИЦ ЖТ: телефон, e-mail, адрес офиса в Сколково и форма обратной связи для партнеров и соискателей.",
    },
    en: {
      title: "Feedback — ECRT",
      description:
        "Contact ECRT: phone, e-mail, Skolkovo office address and feedback form for partners and job applicants.",
    },
  },
  privacy: {
    ru: {
      title: "Политика обработки персональных данных — АО ИЦ ЖТ | ECRT",
      description:
        "Политика АО ИЦ ЖТ в отношении обработки персональных данных: цели, cookie, Яндекс.Метрика, права пользователей и контакты оператора.",
    },
    en: {
      title: "Personal Data Processing Policy — ECRT",
      description:
        "ECRT personal data policy: purposes, cookies, Yandex.Metrica, user rights and controller contact details.",
    },
  },
} as const;

export function trimDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}
