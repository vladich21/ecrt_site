/** Date of incorporation (09.08.2019). Used for hero “years in engineering” stat. */
export const COMPANY_FOUNDING_DATE = new Date(2019, 7, 9);

export const COMPANY_FOUNDING_YEAR = COMPANY_FOUNDING_DATE.getFullYear();

/** Full calendar years since incorporation; increments on each anniversary (09 August). */
export function getCompanyAgeYears(asOf: Date = new Date()): number {
  let years = asOf.getFullYear() - COMPANY_FOUNDING_DATE.getFullYear();
  const anniversaryThisYear = new Date(
    asOf.getFullYear(),
    COMPANY_FOUNDING_DATE.getMonth(),
    COMPANY_FOUNDING_DATE.getDate(),
  );
  if (asOf < anniversaryThisYear) years -= 1;
  return Math.max(1, years);
}

export const companyProfile = {
  legalName: 'Акционерное общество «Инжиниринговый центр железнодорожного транспорта»',
  shortName: 'АО «ИЦ ЖТ»',
  address:
    '121205, г. Москва, внутригородская территория муниципальный округ Можайский, территория инновационного центра Сколково, Большой б-р, дом 40',
  inn: '7708357508',
  okved: '72.19',
  itActivityCode: '1.02',
  email: 'info@ecrt.ru',
  phone: '+7 (495) 909-17-99',
}

export const companyTimeline = [
  { year: '2019', text: 'РЖД и Группа Синара учредили Инжиниринговый центр железнодорожного транспорта.' },
  { year: '2019', text: 'Регистрация компании и формирование административного ядра.' },
  { year: '2020', text: 'Открытие офиса в Сколково, расширение команды и начало технологических коопераций.' },
  { year: '2022', text: 'Запуск проектной деятельности по ключевым компонентам первой линии ВСМ Москва - Санкт-Петербург.' },
  { year: '2024-2026', text: 'Развитие программ первого отечественного высокоскоростного электропоезда и платформы для малоинтенсивных линий, укрепление инженерного контура.' },
]
