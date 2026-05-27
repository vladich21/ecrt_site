# Полный текст сайта ECRT (next-site)

Документ для редактуры и перевода. Структура: **где на сайте** → **RU** / **EN** → **откуда в коде**.

Легенда источников:
- `locales/ru|en/*.json` — основные тексты интерфейса
- `src/data/*.ts` — контент страниц и проектов (часть только RU)
- `app/(site)/**/page.tsx` — SEO (title/description) и простые страницы с текстом в JSX
- `src/features/**` — разметка с захардкоженными строками (помечено ⚠️)

---

## Карта маршрутов

| URL (RU) | URL (EN) | Страница |
|----------|----------|----------|
| `/` | `/en` | Главная |
| `/about-us` | `/en/about-us` | О нас |
| `/projects` | `/en/projects` | Направления деятельности |
| `/project/[slug]` | тот же slug | Портрет проекта |
| `/careers` | `/en/careers` | Карьера |
| `/purchase` | `/en/purchase` | Закупки |
| `/documents` | `/en/documents` | Документация |
| `/contacts` | `/en/contacts` | Контакты |

**Общая оболочка** (шапка, футер, крошки, переключатель языка) — на всех страницах: `LegacySiteShell` + `locales/*/common.json`.

---

## SEO: title и description (браузер / соцсети)

Источник: `app/(site)/**/page.tsx`, `buildPageMetadata`.

| Маршрут | Title | Description |
|---------|-------|-------------|
| `/` | АО ИЦ ЖТ \| ECRT | Инжиниринговый центр железнодорожного транспорта |
| `/en` | ECRT \| Engineering Centre for Rail Transport | Engineering Centre for Rail Transport |
| `/about-us` | О нас — АО ИЦ ЖТ \| ECRT | О компании АО ИЦ ЖТ |
| `/en/about-us` | About — ECRT | About Engineering Centre for Rail Transport |
| `/projects` | Направления деятельности — АО ИЦ ЖТ \| ECRT | Направления деятельности АО ИЦ ЖТ |
| `/en/projects` | Focus areas — ECRT | (см. `en/projects/page.tsx`) |
| `/careers` | Карьера — АО ИЦ ЖТ \| ECRT | Вакансии и карьера в АО ИЦ ЖТ |
| `/en/careers` | Careers — ECRT | Careers and vacancies at ECRT |
| `/purchase` | Закупки — АО ИЦ ЖТ \| ECRT | Информация о закупочной деятельности АО ИЦ ЖТ |
| `/en/purchase` | Procurement — ECRT | Procurement information of Engineering Centre for Rail Transport |
| `/documents` | Документация — АО ИЦ ЖТ \| ECRT | Документы и официальные материалы АО ИЦ ЖТ |
| `/en/documents` | Documents — ECRT | Documents and official materials of Engineering Centre for Rail Transport |
| `/contacts` | Контакты — АО ИЦ ЖТ \| ECRT | Контакты АО ИЦ ЖТ |
| `/en/contacts` | Contacts — ECRT | Contacts of Engineering Centre for Rail Transport |
| `/project/[slug]` | `{название проекта} — АО ИЦ ЖТ \| ECRT` | `{название}. Инжиниринговый центр железнодорожного транспорта.` |

---

## 1. Оболочка сайта (все страницы)

Источник: `locales/ru/common.json` | `locales/en/common.json`

### Навигация (шапка и футер «Разделы»)

| Ключ | RU | EN |
|------|----|----|
| nav.home | Главная | Home |
| nav.about | О нас | About |
| nav.projects | Направления деятельности | Activities *(в EN nav короче, чем breadcrumbs)* |
| nav.careers | Карьера | Careers |
| nav.purchase | Закупки | Procurement |
| nav.documents | Документация | Documents |
| nav.contacts | Контакты | Contacts |

### Хлебные крошки

| Ключ | RU | EN |
|------|----|----|
| breadcrumbs.home | Главная | Home |
| breadcrumbs.about | О нас | About |
| breadcrumbs.projects | Направления деятельности | Focus areas |
| breadcrumbs.careers | Карьера | Careers |
| breadcrumbs.purchase | Закупки | Procurement |
| breadcrumbs.documents | Документация | Documents |
| breadcrumbs.contacts | Контакты | Contacts |

### Герой на главной (первый экран)

| Ключ | RU | EN |
|------|----|----|
| hero.lead | Инжиниринговый центр\nжелезнодорожного транспорта | Engineering Centre for\nRail Transport |
| hero.title | Инновационная инженерия будущего движения | Innovative engineering for the future of mobility |
| hero.ctaDirections | Направления | Focus areas |
| hero.ctaProjects | Проекты | Projects |

### Карточки статистики под героем

| Ключ | RU | EN |
|------|----|----|
| heroStats.heading | Ключевые показатели центра | Key figures |
| heroStats.labels.years | лет в инжиниринге железнодорожного транспорта | years in rail transport engineering |
| heroStats.labels.projects | реализованных проектов и научно-технических работ | completed projects & R&D works |
| heroStats.labels.directions | направления — от ВСМ до водорода и инфраструктуры | focus areas — HSR through hydrogen & infrastructure |
| heroStats.labels.team | инженеров, конструкторов и промышленных дизайнеров | engineers, designers & industrial designers |

*(Полные sr-тексты для скринридеров — в `heroStats.sr0`…`sr3` в тех же JSON.)*

### Футер

| Ключ | RU | EN |
|------|----|----|
| footer.contacts | Контакты | Contacts |
| footer.company | АО «Инжиниринговый центр железнодорожного транспорта» | Joint Stock Company «Engineering Centre for Rail Transport» |
| footer.address | Москва, Большой б-р, 40 (Сколково) | Moscow, Bolshoy Blvd 40 (Skolkovo) |
| footer.sections | Разделы | Site sections |
| footer.official | Официальные ресурсы | Official resources |
| footer.rzdTitle | Работа в РЖД | Careers at Russian Railways |
| footer.rzdSub | Вакансии и карьера | Vacancies and careers |
| footer.skAlt | Sk-участник | Skolkovo resident |

### Прочее (a11y, язык, ошибки)

| Ключ | RU | EN |
|------|----|----|
| lang.ru / lang.en | Рус / Eng | Ru / En |
| a11y.skipToContent | Перейти к содержимому | Skip to content |
| loading.page | Загрузка… | Loading… |
| error.title | Ошибка отображения | Display error |
| error.body | Часть страницы не загрузилась… | Part of the page failed to load… |
| error.retry | Повторить | Try again |

---

## 2. Главная `/` и `/en`

Источник: `locales/ru/home.json` | `locales/en/home.json`, плюс ⚠️ `HomePageClient.tsx`, `featuredShowcase.ts`, `ecrtSite.ts` (фрагмент).

### Блок «Будущее» (видео + текст)

| | RU | EN |
|---|----|----|
| Заголовок | От опытной очереди — к ВСМ‑1 | From prototypes to fast main line service |
| Текст | Очередная скоростная платформа уже на конвейере «Уральских локомотивов»… | The next iteration of rolling stock platform work is underway at Ural Locomotives… |
| aria видео | Ночная анимация: скоростной состав… | Night-time animation of a high-speed train… |

### Блок «Флагман» (ВСМ Москва — СПб)

| | RU | EN |
|---|----|----|
| Тег 1 | Флагманский проект | Flagship programme |
| Тег 2 | 2024 — 2030 | 2024 — 2030 |
| Заголовок раздела | Флагманская программа центра | The centre's flagship programme |
| Lead раздела | Главный инженерный контур для будущей высокоскоростной магистрали… | The main engineering thread for the future high-speed line… |
| Фоновые метки | ВСМ-1 / 400 КМ/Ч / ЕЦРТ | HSL-1 / 400 KM/H / ECRT |
| Заголовок карточки | ВСМ Москва — Санкт-Петербург | HSL Moscow – Saint Petersburg |
| Описание | Ведём ключевые работы под первую высокоскоростную магистраль… | We align rolling stock design, traction electrification… |
| CTA 1 | Смотреть кейс | Open the EVS360 case |
| CTA 2 | Все направления | All programmes |
| alt карты | Инфографика маршрута первой ВСМ… | Infographic of the first high-speed main line route… |

**Факты справа** (5 карточек): 400 км/ч, 679 км, 2:15, 25 кВ, 23 млн пасс./год — заголовки и тексты в `home.json` → `flagship.facts[]`.

### Блок «Ещё направления» (сетка проектов на главной)

| | RU | EN |
|---|----|----|
| Заголовок | Ещё направления центра | More centre programmes |
| Ссылка | Все направления | All focus areas |
| Lead | Помимо платформы ЭВС‑360… | Beyond the EVS360 platform… |

⚠️ **Только RU** (захардкожено в `HomePageClient.tsx`, плитки bento):

- **ВСП** — Высокоскоростной электропоезд ЭВС-360 — hover: «Полный цикл ОКР: от ТТ и ТЗ…»
- **Модель КС и токоприёмника** — из `strategicProjects`
- **Комплекс КС-400** — из `strategicProjects`
- **ПС для малоинтенсивных линий** — категория «Региональные линии», teaser и hover в коде
- **Ресурс пути и диагностика** — категория «Инфраструктура», teaser и hover в коде

Источник плиток: `featuredShowcase.ts`, `ecrtSite.ts` → `strategicProjects`, константы в `HomePageClient.tsx`.

### Блок «Партнёры экосистемы» (только главная)

| | RU |
|---|-----|
| Заголовок ⚠️ | Партнёры экосистемы проектов |

**Логотипы** (`footerPartners.ts`, alt):

- ОАО «Российские железные дороги»
- Партнёр экосистемы проектов
- Группа Синара

---

## 3. О нас `/about-us` и `/en/about-us`

Источник: `locales/ru/about.json` | `locales/en/about.json`

| Блок | RU | EN |
|------|----|----|
| H1 | О нас | About us |
| Подзаголовок | Совместное предприятие РЖД и «Синары»… | A joint venture of Russian Railways and Sinara… |
| История развития | История развития / Шесть лет, которые задали направление. | Engineering grounded in a century of rail / Six years that set the direction. |
| Вехи истории | Учреждение ИЦ ЖТ; Старт компании; Сколково; ЭВС 360; КС-400; Региональные линии | Centre founded; Go-live; Skolkovo; EVS 360 platform; Catenary KS-400; Low-traffic lines |
| Руководитель | Кирейцев Александр, генеральный директор | Alexander Kireytsev, Chief Executive Officer |
| Цитата CEO | «Инжиниринговый центр…» (полный текст в JSON) | «Engineering Centre for Rail Transport is a joint venture…» |
| Столпы — заголовок | Основные направления работы | Core areas of work |
| Столпы — 4 пункта | Консолидация опыта… / Формирование команды… / Проектирование… / Передача опыта… | Consolidating know-how… / Building a team… / Designing… / Passing on expertise… |
| История — заголовок | Проектная деятельность разработки с 2019 года | The centre in the industry landscape *(EN: другой подзаголовок в JSON)* |
| 3 блока story | Учредители… / НИОКР… / Пилотная программа ВСП… | Founders… / R&D… / High-speed trainset flagship… |
| CTA | Направления деятельности | Explore our focus areas |

---

## 4. Направления `/projects` и `/en/projects`

Источник: `locales/*/projects.json`, `ecrtSite.ts` → `activityGroups` (RU), `projects.json` → `directions.groups` (EN).

### Шапка страницы

| | RU | EN |
|---|----|----|
| H1 | Направления деятельности | Focus areas |
| Tagline | Инженерные программы высокоскоростного состава… | Programmes spanning high-speed trainsets… |

### Аккордеон «Тематика разработок»

**RU** — 5 групп в `ecrtSite.ts` → `activityGroups` (кабина, тяга, комфорт, безопасность, диагностика — полные списки пунктов в файле).

**EN** — те же id, тексты в `locales/en/projects.json` → `directions.groups.*`.

### Витрина «Ключевые проекты»

| i18nKey | RU title | EN title |
|---------|----------|----------|
| evs | Высокоскоростной электропоезд ЭВС-360 | High-speed trainset ЭВС-360 |
| ksModel | Модель КС и токоприёмника | Catenary & pantograph modelling |
| ks400 | Опорные решения и испытания | Reference hardware & testing |
| regional | Подвижной состав для малодеятельных участков | Trainsets for low-traffic corridors |
| track | Ресурс пути и диагностика | Track life & diagnostics |

CTA: «Открыть портрет проекта» / «Open programme».

---

## 5. Страницы проектов `/project/[slug]`

⚠️ Заголовки секций на страницах проектов **только RU** в `ProjectDetailView.tsx`: «О проекте», «Ключевые тезисы», «Детализация», «Иллюстрации», «Ключевые параметры», «Инженерный контекст», «Подтвержденные факты», «Иллюстрации и материалы».

### 5.1 `/project/evs-360`

Источник: `data/projects.ts`, `data/evs360Status.ts`, `Evs360ReportBlock.tsx`.

**Карточка проекта (projects.ts):**

- Код: ЭВС 360
- Название: Высокоскоростной электропоезд
- Статус: Активная разработка
- Описание, facts[], details[] — полный текст в `projects.ts`

**Блок отчёта ЭВС-360:**

- Заголовок: Приоритеты развития
- Intro + 4 буллета — `evs360Status.ts`
- Легенда диаграммы: Выполнено / В работе / Запланировано
- alt диаграмм — в `Evs360ReportBlock.tsx` (RU)

**Сноска галереи:** «Материалы из внутренних презентаций (в т.ч. ВСМ-ИНФО). Внешняя публикация — по согласованию.»

### 5.2 `/project/ks-400-model` и `/project/ks-400-catenary`

Источник: `data/ecrtSite.ts` → `strategicProjects[]` — title, status, period, teaser, value, description, bullets[], details[] (полностью на RU).

### 5.3 `/project/project-0009-low-intensity`

Источник: `projects.ts` — Подвижной состав для малоинтенсивных линий, facts (58/126 мест, 20 млн руб.), details[].

### 5.4 `/project/track-resource-2-5b`

Источник: `projects.ts` — Технологии ресурса пути, 2,5 млрд тонн, details[].

### 5.5 `/project/project-0007-hydrogen`

Источник: `projects.ts` — Водородный локомотив, статус «Проект заморожен», справка 2024.

---

## 6. Карьера `/careers` и `/en/careers`

Источник: `locales/*/careers.json`, email из `careersLinks.ts` → `info@ecrt.ru`.

| Блок | RU (сокращённо) | EN |
|------|-----------------|-----|
| Hero title | Инженерия, у которой есть пробег | Engineering with real mileage |
| Hero lead | Высокоскоростные составы, водородные… | High-speed trainsets, hydrogen commuter… |
| Culture | Как у нас устроена работа + цитата + 2 абзаца | How we build products… |
| Benefits | 8 карточек (ДМС, обучение, Сколково…) | 8 cards (Health cover, Learning…) |
| Vacancies | Где смотреть и **подавать отклик** | Where to read specs and **submit applications** |
| hh CTA | Все вакансии на hh.ru | Browse every vacancy on hh.ru |
| CTA | Напишите напрямую + CV + {{email}} | Write to us directly… |

---

## 7. Закупки `/purchase` и `/en/purchase`

Источник: текст в `app/(site)/purchase/page.tsx` и `en/purchase/page.tsx`.

**RU:** цель закупок, 223-ФЗ, ЕИС и РТС-тендер, compliance@ecrt.ru.

**EN:** efficient procurement, Federal Law 223-FZ, UIS and RTS-tender, compliance@ecrt.ru.

---

## 8. Документация `/documents` и `/en/documents`

**Вводный текст:**

- RU: «Ниже собраны ключевые документы и PDF-файлы из раздела документации ecrt.ru.»
- EN: «Key documents and PDF files from the ecrt.ru documents section are collected below.»

**Список PDF** (названия только RU, `ecrtSite.ts` → `documents`):

1. Устав АО «ИЦ ЖТ»
2. Свидетельство ИНН АО «ИЦ ЖТ»
3. Свидетельство КПП АО «ИЦ ЖТ»
4. Лист записи о юридическом адресе АО «ИЦ ЖТ»
5. Политика в области качества
6. Сертификат СМК ISO 9001:2015 ENG
7. Сертификат СМК ISO 9001:2015 RUS
8. Сертификат ГОСТ Р ИСО 9001 RUS
9. Сертификат EN 15085-2
10. Перечень мероприятий по улучшению условий труда
11. Сводная ведомость результатов СОУТ

---

## 9. Контакты `/contacts` и `/en/contacts`

| | RU | EN |
|---|----|----|
| H1 | Контакты | Contacts |
| Телефон | +7 (495) 909-17-99 | Phone: +7 (495) 909-17-99 |
| Email | info@ecrt.ru | info@ecrt.ru |
| Юр. адрес | 121205, Москва, Сколково, Большой б-р, д. 40… | 40 Bolshoy Boulevard, Skolkovo… |
| Факт. адрес | БЦ Амальтея, этаж 3, сектор А… | Amalthea Business Centre, floor 3, sector A… |

Дополнительно в `company.ts`: полное юр. имя, ИНН, ОКВЭД (не все выводятся на странице).

---

## 10. Что пока без EN-версии (технический долг)

Для полного двуязычия позже вынести в `locales` или `data` с locale:

- ⚠️ `HomePageClient.tsx` — партнёры, bento-плитки
- ⚠️ `footerPartners.ts` — alt логотипов
- ⚠️ `ProjectDetailView.tsx` — заголовки секций и сноски
- ⚠️ `projects.ts`, `ecrtSite.ts` (strategicProjects), `evs360Status.ts` — тела проектов
- ⚠️ `documents` — названия PDF
- `ecrtSite.ts` → `homeProjectsText` (не используется на UI напрямую в grep — проверить при рефакторинге)

---

## 11. Файлы-источники (для разработчика)

```
next-site/
  app/(site)/**/page.tsx          # маршруты, metadata, contacts/purchase/documents
  src/locales/ru|en/
    common.json                     # оболочка, nav, hero, footer
    home.json                       # главная: хронология, future, flagship, projects block
    about.json
    careers.json
    projects.json                   # EN: directions + showcase; RU showcase частично
  src/data/
    projects.ts                     # портреты проектов (slug)
    ecrtSite.ts                     # nav, activityGroups RU, strategicProjects, documents
    featuredShowcase.ts             # главная: крупная плитка ЭВС
    evs360Status.ts                 # блок приоритетов ЭВС-360
    footerPartners.ts
    company.ts
    careersLinks.ts
  src/features/
    home/HomePageClient.tsx
    company/AboutPageClient.tsx
    careers/CareersPageClient.tsx
    projects/ProjectsPageClient.tsx
    projects/ProjectDetailView.tsx
    legacy-shell/LegacySiteShell.tsx
```

---

*Сгенерировано для репозитория ecrt/next-site. При изменении JSON/TS обновите этот файл или пересоберите выгрузку.*
