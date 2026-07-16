# ECRT — корпоративный сайт

Сайт АО «ИЦ ЖТ» на Next.js (RU / EN).

## Запуск

```bash
npm install
npm run dev
```

Открыть: [http://localhost:3000](http://localhost:3000)

```bash
npm run build   # production-сборка
npm run start   # запуск после build
npm run lint
```

## Переменные окружения

Скопируйте `.env.example` → `.env` и при необходимости измените значения:

- `NEXT_PUBLIC_SITE_URL` — адрес сайта (по умолчанию `https://ecrt.ru`)
- `NEXT_PUBLIC_YANDEX_METRIKA_ID` — ID счётчика Яндекс.Метрики

## Структура

- `app/` — маршруты страниц
- `src/` — компоненты, данные, переводы
- `public/` — статичные файлы (видео, документы, иконки)
