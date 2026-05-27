# Next.js-приложение миграции (`next-site`)

## Команды

Все команды выполняются из каталога `next-site`. Это единственный npm-проект в репозитории.

- `npm install`
- `npm run dev` - локальный dev-сервер на порту 3000
- `npm run lint`
- `npm run build` - production-сборка
- `npm run start` - production-сервер после `build`
- `npm run perf:lighthouse` - Lighthouse baseline по `lighthouserc.json`
- `npm run media:webp` - конвертация PNG/JPEG в WebP (src/assets, public/images)
- `npm run media:webm` - конвертация MP4 в WebM (public/videos; исходники не перезаписываются)

## Окружение

- `NEXT_PUBLIC_SITE_URL` - публичный origin сайта для metadata, sitemap и robots

## Статус Миграции

- **Phase A:** App Router, metadata/robots/sitemap, Web Vitals, CI.
- **Phase B:** статические маршруты в `app/(site)/...`.
- **Phase C:** `/projects`, `/en/projects`, `/project/[projectSlug]` с SSG, metadata и JSON-LD breadcrumbs.
- **Phase D (частично):** `next/image` в блоках проектов, `next/font` с IBM Plex Sans, `revalidate` 1d на проектных маршрутах.
- **Phase E:** каталог `src/legacy` удален, активный код живет в `app/`, `src/features/` и `src/shared/` (2026-05-18).
- **Phase F:** `src/shared/seo`, дробление `HomePageClient` / `AboutPageClient` на `sections/`, ключевые картинки через `next/image`, красные акценты в разделённых паттернах брендинга (`pillarsHeadRule`, CTA, хронология, «плюсы» статистики) (2026-05-18).

## План Архитектурной Миграции

Переходный слой `src/legacy` удален (шаги 9-10 выполнены 2026-05-18); ниже сохранены целевая архитектура и история переноса.

```text
app/                 # маршруты, metadata, route layouts, route handlers
src/features/        # страницы и крупные доменные блоки сайта
src/shared/          # общий layout, header, footer, breadcrumbs, переиспользуемый UI
src/data/            # статические данные и доменные справочники
src/locales/         # тексты RU/EN
src/assets/          # изображения, видео, svg
```

`app` должен оставаться тонким слоем маршрутизации. Верстка страниц, интерактивные блоки и стили страниц должны жить в `src/features` или `src/shared`.

### Правила Переноса И Сопровождения

- После добавления временных переездов можно проверять отсутствие мертвых путей: `rg "@/legacy" app src` (ожидаемо ноль совпадений).
- `npm run build` запускать только когда остановлен dev-сервер.
- Не запускать `npm run build`, пока работает `npm run dev`: оба процесса пишут в `.next` и могут сломать dev-кэш.
- Если dev начинает падать с `routes-manifest.json` или `Cannot find module './*.js'`, остановить dev, удалить `.next`, затем снова запустить `npm run dev`.
- Стили держать рядом с компонентом или в соответствующей feature-папке.
- Публичные URL не менять: `/`, `/about-us`, `/projects`, `/project/[projectSlug]`, `/contacts`, `/documents`, `/purchase`, EN-маршруты.

### Зачем Нужен `SiteShell`

`SiteShell` - общий каркас публичного сайта для всех маршрутов внутри `app/(site)`.

Он нужен, потому что каждой публичной странице требуется одинаковая внешняя структура:

- skip-to-content ссылка;
- фиксированный header;
- breadcrumbs;
- основной `<main>`;
- footer.

Route layout при этом остается коротким:

```tsx
import { SiteShell } from "@/shared/layout/SiteShell/SiteShell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
```

Старый большой shell-файл был разбит, потому что `Header`, `Footer`, `Breadcrumbs` и `LanguageSwitcher` имеют разные ответственности: так проще читать код, ревьюить изменения и держать стили рядом с компонентами.

### Целевая Структура

```text
src/
  features/
    home/
      HomePageView.tsx
      HomePageClient.tsx
      home-types.ts
      home-page-motion.ts
      sections/
        HeroSection.tsx
        HeroStatsCards.tsx
        HomeFutureFlagshipSections.tsx
        ProjectProductShowcase.tsx
        EcosystemPartnersSection.tsx

    company/
      AboutPageView.tsx
      AboutPageClient.tsx
      about-types.ts
      about-page-motion.ts
      about-page.module.scss
      sections/
        AboutHeroSection.tsx
        AboutChronologySection.tsx
        AboutPillarsSection.tsx
        AboutStorySection.tsx
        AboutLeadershipSection.tsx
        DevelopmentTimeline/

    careers/
      CareersPageView.tsx
      CareersPageClient.tsx
      careers-page.module.scss

    projects/
      ProjectsPageView.tsx
      ProjectsPageClient.tsx
      ProjectDetailView.tsx
      components/
      projects-page.module.scss

    purchase/
      PurchasePageView.tsx
      purchase-page.module.scss

  shared/
    seo/
      build-page-metadata.ts
      organization-jsonld.tsx

    layout/
      SiteShell/
      Header/
      Footer/
      Breadcrumbs/

    ui/
      LanguageSwitcher/
      SitePageShell/
      SectionHeader/
```

### Правила Нейминга

Правила основаны на распространенных подходах Next.js App Router и React.

- `app` использовать только для маршрутов, route layouts, metadata, route handlers и route-level файлов `loading/error`; metadata и origin-хелперы импортировать из `src/shared/seo/`.
- `features/<domain>` использовать для доменов страниц: `home`, `company`, `careers`, `projects`, `purchase`.
- `shared/layout` использовать для layout-блоков всего сайта: `SiteShell`, `Header`, `Footer`, `Breadcrumbs`.
- `shared/ui` использовать для переиспользуемых UI-частей, не привязанных к одной странице: `LanguageSwitcher`, `SitePageShell`, `SectionHeader`.
- React-компоненты и файлы компонентов называть в PascalCase: `SiteShell.tsx`, `ProjectDetailView.tsx`, `LanguageSwitcher.tsx`.
- CSS Modules называть в kebab-case: `site-shell.module.scss`, `project-detail.module.scss`, `language-switcher.module.scss`.
- Использовать доменные названия, а не визуальные прозвища. Лучше `ProjectProductShowcase` или `ProjectShowcase`, чем `ProjectBento`.
- Не оставлять временные названия в постоянном коде: `legacy`, `skeleton`, `old`, `new`, `tmp`.
- `View` использовать для page/server-композиции, `Client` - только если компонент действительно client component.
- Boolean-переменные и props начинать с `is`, `has`, `can` или `should`.
- Callback props начинать с `on`: `onSubmit`, `onToggle`, `onSelect`.

### Аудит Нейминга

Сделано в Phase F: `HomePageClient` / `AboutPageClient` разнесены на `sections/`, публичная SEO-утилита перенесена в `src/shared/seo`, `HomePageView`/`AboutPageView` экспортируют сервер-friendly обёртку над `*PageClient`.

Открытые улучшения:

- `project-product-showcase.module.scss` можно переименовать под финальное имя блока, если появится отдельный файл `ProjectProductShowcase.tsx` только для композиции JSX.
- Общие акцентные цвета держать в ограниченном наборе переменных (`--ecrt-red`, `--ecrt-blue` и т.п.), явно фиксируя правило: красный для CTA/линий-акцентов, тёмно-синий для крупных заголовков при необходимости.

### План уплотнения качества (следующие итерации)

1. **`next/image`:** дожать `<img>` в `Header`, `Footer`, `CareersPageClient` и любых новых блоках; сохранять осмысленный `sizes` и не ломать верстку SVG/логотипов.
2. **Локали:** сохранять зеркальные ключи между RU/EN JSON в одном домене (about/projects уже синхронизированы по структуре); при добавлении поля — в обоих языках сразу.
3. **Токены темы:** при росте числа страниц вынести палитру акцентов в один SCSS partial или `:root` в `globals.css`, явно зафиксировать где «корпоративный красный», где «холодный синий» для инженерной подачи.
4. **Перфоманс:** после значимых изменений медиа — production `npm run build` + `npm run start` и выборочный Lighthouse по маршрутам из guardrails.
5. **SCSS / CSS Modules:** при росте стилей ориентироваться на `docs/scss-conventions.md`; перед чисткой — `npm run audit:css-modules` (наивная проверка, не заменяет ревью). Общие `*.shared.scss` не вводить без явного переиспользования в двух и более фичах.

1. **Инвентаризация legacy-использования** - done 2026-05-18
   - Найти все импорты через `rg "@/legacy" app src`.
   - Разделить файлы на: активный shared layout, активные feature-стили, дубли project-стилей, старые неиспользуемые файлы.

2. **Перенести site shell в shared** - done 2026-05-18
   - Перенести `src/features/legacy-shell/LegacySiteShell.tsx` в `src/shared/layout/SiteShell/SiteShell.tsx`.
   - Переименовать `LegacySiteShell` в `SiteShell`.
   - Обновить `app/(site)/layout.tsx`.

3. **Разбить shared layout на компоненты** - done 2026-05-18
   - Вынести из `SiteShell`: `Header`, `Footer`, `Breadcrumbs`, `LanguageSwitcher`.
   - Перенести стили рядом с новыми компонентами:
     - `header.module.scss`
     - `footer.module.scss`
     - `breadcrumbs.module.scss`
     - `language-switcher.module.scss`
     - `site-shell.module.scss`

4. **Перенести общие page-shell стили** - done 2026-05-18
   - Заменить `src/legacy/pages/site/SiteSkeleton.module.scss` на `src/shared/ui/SitePageShell/site-page-shell.module.scss`.
   - Обновить контакты, документы, home/about usages.

5. **Перенести home-стили из legacy** - done 2026-05-18
   - Перенести используемые home/hero стили:
     - `legacy/components/hero/HeroSection.module.scss`
     - `legacy/components/hero/HeroStatsCards.module.scss`
     - `legacy/components/home/HomeFutureFlagship.module.scss`
     - `legacy/components/projects/ProjectBento.module.scss`
     - `legacy/components/footer/EcosystemPartnersSection.module.scss`
   - Цель: `src/features/home/`.

6. **Перенести company/about стили** - done 2026-05-18
   - Перенести `legacy/pages/site/AboutPage.module.scss` в `src/features/company/about-page.module.scss`.
   - Перенести timeline-стили About в `src/features/company/sections/DevelopmentTimeline/` или `src/shared/ui/Timeline/`, если блок будет переиспользоваться.

7. **Перенести careers стили** - done 2026-05-18
   - Перенести `legacy/pages/site/CareersPage.module.scss` в `src/features/careers/careers-page.module.scss`.

8. **Нормализовать projects** - done 2026-05-18
   - Держать project-код в `src/features/projects`.
   - Дубли с бывшим `legacy/components/projects` удалены; активные SCSS живут рядом с проектными компонентами в `src/features/projects`.

9. **Удалить неиспользуемые legacy-файлы** - done 2026-05-18
   - После проверки импортов удалены оставшиеся SCSS в `src/legacy`, на которые никто не ссылался.

10. **Удалить `src/legacy`** - done 2026-05-18
    - Каталог `src/legacy` удален полностью.
    - `npm run build` проходит (2026-05-18).

### Финальный Статус Legacy

На 2026-05-18:

```bash
rg "@/legacy" app src
```

Совпадений в активном коде нет (только упоминания в этом README). Каталога `src/legacy` не существует.

#### Перенесенный shared layout

Эти файлы уже перенесены в `src/shared/layout` и `src/shared/ui`:

- `src/shared/layout/SiteShell/SiteShell.tsx`
- `src/shared/layout/SiteShell/site-shell.module.scss`
- `src/shared/layout/SiteShell/site-shell-utils.ts`
- `src/shared/layout/Header/Header.tsx`
- `src/shared/layout/Header/header.module.scss`
- `src/shared/layout/Footer/Footer.tsx`
- `src/shared/layout/Footer/footer.module.scss`
- `src/shared/layout/Breadcrumbs/Breadcrumbs.tsx`
- `src/shared/layout/Breadcrumbs/breadcrumbs.module.scss`
- `src/shared/ui/LanguageSwitcher/LanguageSwitcher.tsx`
- `src/shared/ui/LanguageSwitcher/language-switcher.module.scss`

#### Перенесенные shared page styles

`SiteSkeleton` уже перенесен:

- `src/shared/ui/SitePageShell/site-page-shell.module.scss`

#### Перенесенные home-стили

Эти файлы уже перенесены в `src/features/home`:

- `src/features/home/hero-section.module.scss`
- `src/features/home/hero-stats-cards.module.scss`
- `src/features/home/home-future-flagship.module.scss`
- `src/features/home/project-product-showcase.module.scss`
- `src/features/home/ecosystem-partners-section.module.scss`

#### Перенесенные company/careers стили

Эти файлы уже перенесены рядом с соответствующими feature-страницами:

- `src/features/company/about-page.module.scss`
- `src/features/company/sections/DevelopmentTimeline/home-vertical-timeline.module.scss`
- `src/features/careers/careers-page.module.scss`

#### Нормализованные project-стили

Активные project-стили находятся в `src/features/projects`. Последний неиспользуемый хвост project/news/story-тематических `.module.scss`, который лежал в `src/legacy`, удален вместе с папкой в шаге 9.

### Definition Of Done

- `src/legacy` удален.
- `src/features/legacy-shell` удален.
- `app/(site)/layout.tsx` импортирует `SiteShell` из `src/shared/layout/SiteShell`.
- Все активные страницы держат стили в своей feature-папке или в `src/shared`.
- `npm run build` проходит.
- Основные публичные страницы открываются без регрессий маршрутов и metadata.
