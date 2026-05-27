import projectDetailEn from "@/locales/en/project-detail.json";
import projectDetailRu from "@/locales/ru/project-detail.json";
import { getStrategicProjectBySlug } from "@/data/ecrtSite";
import { getProjectBySlug } from "@/data/projects";
import {
  evs360CharacteristicsBullets,
  evs360CharacteristicsHeading,
  evs360CharacteristicsIntro,
  evs360CharacteristicsMetrics,
  evs360FocusBullets,
  evs360FocusHeading,
  evs360FocusIntro,
  evs360ScaleHeading,
  evs360ScaleIntro,
  evs360ScaleMetrics,
  evs360ScheduleHeading,
  evs360ScheduleIntro,
  evs360ScheduleMetrics,
  evs360ScheduleParagraphs,
  evs360SourceNote,
} from "@/data/evs360Status";
import type { ProjectReportSection } from "./ProjectReportSections";

export type ProjectDetailLocale = "ru" | "en";

export type ProjectDetailUi = typeof projectDetailRu.ui;
export type ProjectDetailSliderUi = typeof projectDetailRu.slider;
export type ProjectDetailMeta = typeof projectDetailRu.meta;

export type LocalizedCatalogProject = {
  title: string;
  code: string;
  statusLabel: string;
  segment: string;
  year: string;
  metric: string;
  description: string;
  facts: string[];
  details: string[];
};

export type LocalizedStrategicSection = {
  title: string;
  paragraphs: string[];
};

export type LocalizedStrategicProject = {
  title: string;
  status: string;
  period: string;
  teaser: string;
  description: string;
  bullets: string[];
  sections: LocalizedStrategicSection[];
  details: string[];
};

export type Evs360MetricCopy = {
  value: string;
  unit: string;
  label: string;
};

export type Evs360ReportCopy = {
  focusHeading: string;
  focusIntro: string;
  focusBullets: string[];
  characteristicsHeading: string;
  characteristicsIntro: string;
  characteristicsBullets: string[];
  characteristicsMetrics: Evs360MetricCopy[];
  scheduleHeading: string;
  scheduleIntro: string;
  scheduleParagraphs: string[];
  scheduleMetrics: Evs360MetricCopy[];
  scaleHeading: string;
  scaleIntro: string;
  scaleMetrics: Evs360MetricCopy[];
  sourceNote: string;
};

export type TrackV25FieldStageCopy = {
  id: string;
  title: string;
  description: string;
  locationNote?: string;
};

export type TrackV25FieldCopy = {
  heading: string;
  intro: string;
  stages: TrackV25FieldStageCopy[];
};

export type TrackV25ModelingBlockCopy = {
  title: string;
  body: string;
};

export type TrackV25ModelingCopy = {
  heading: string;
  intro: string;
  blocks: TrackV25ModelingBlockCopy[];
};

export type TrackFasteningCalculationsCopy = {
  heading: string;
  intro: string;
  directions: TrackV25ModelingBlockCopy[];
};

function detailBundle(locale: ProjectDetailLocale) {
  return locale === "en" ? projectDetailEn : projectDetailRu;
}

export function projectDetailPath(slug: string, locale: ProjectDetailLocale): string {
  return locale === "en" ? `/en/project/${slug}` : `/project/${slug}`;
}

export function getProjectDetailUi(locale: ProjectDetailLocale): ProjectDetailUi {
  return detailBundle(locale).ui;
}

export function getProjectDetailSliderUi(locale: ProjectDetailLocale): ProjectDetailSliderUi {
  return detailBundle(locale).slider;
}

export function getProjectDetailMeta(locale: ProjectDetailLocale): ProjectDetailMeta {
  return detailBundle(locale).meta;
}

export function getTrackV25FieldUi(locale: ProjectDetailLocale) {
  return detailBundle(locale).trackV25Field;
}

export function heroAltText(title: string, locale: ProjectDetailLocale): string {
  return `${title} ${getProjectDetailUi(locale).heroAltSuffix}`;
}

export function galleryImageAlt(title: string, index: number, locale: ProjectDetailLocale): string {
  return getProjectDetailUi(locale).galleryImageAlt
    .replace("{title}", title)
    .replace("{index}", String(index + 1));
}

export function resolveProjectTitle(slug: string, locale: ProjectDetailLocale = "ru"): string {
  const strategic = getLocalizedStrategicProject(slug, locale);
  if (strategic) return strategic.title;
  const catalog = getLocalizedCatalogProject(slug, locale);
  return catalog?.title ?? slug;
}

export function getLocalizedCatalogProject(
  slug: string,
  locale: ProjectDetailLocale,
): LocalizedCatalogProject | null {
  if (locale === "en") {
    const catalog = projectDetailEn.catalog as Record<string, LocalizedCatalogProject | undefined>;
    return catalog[slug] ?? null;
  }

  const project = getProjectBySlug(slug);
  if (!project) return null;

  return {
    title: project.title,
    code: project.code,
    statusLabel: project.statusLabel,
    segment: project.segment,
    year: project.year,
    metric: project.metric,
    description: project.description,
    facts: project.facts,
    details: project.details,
  };
}

export function getLocalizedStrategicProject(
  slug: string,
  locale: ProjectDetailLocale,
): LocalizedStrategicProject | null {
  if (locale === "en") {
    const strategic = projectDetailEn.strategic as Record<string, LocalizedStrategicProject | undefined>;
    return strategic[slug] ?? null;
  }

  const project = getStrategicProjectBySlug(slug);
  if (!project) return null;

  return {
    title: project.title,
    status: project.status,
    period: project.period,
    teaser: project.teaser,
    description: project.description,
    bullets: project.bullets,
    sections: project.sections ?? [],
    details: project.details,
  };
}

export function getEvs360ReportCopy(locale: ProjectDetailLocale): Evs360ReportCopy {
  if (locale === "en") {
    return projectDetailEn.reports["evs-360"] as Evs360ReportCopy;
  }

  return {
    focusHeading: evs360FocusHeading,
    focusIntro: evs360FocusIntro,
    focusBullets: [...evs360FocusBullets],
    characteristicsHeading: evs360CharacteristicsHeading,
    characteristicsIntro: evs360CharacteristicsIntro,
    characteristicsBullets: [...evs360CharacteristicsBullets],
    characteristicsMetrics: [...evs360CharacteristicsMetrics],
    scheduleHeading: evs360ScheduleHeading,
    scheduleIntro: evs360ScheduleIntro,
    scheduleParagraphs: [...evs360ScheduleParagraphs],
    scheduleMetrics: [...evs360ScheduleMetrics],
    scaleHeading: evs360ScaleHeading,
    scaleIntro: evs360ScaleIntro,
    scaleMetrics: [...evs360ScaleMetrics],
    sourceNote: evs360SourceNote,
  };
}

function reportSections(slug: string, locale: ProjectDetailLocale): ProjectReportSection[] {
  if (locale === "en") {
    const reports = projectDetailEn.reports as Record<
      string,
      { sections?: ProjectReportSection[] } | Evs360ReportCopy
    >;
    const entry = reports[slug];
    if (entry && "sections" in entry && entry.sections) {
      return entry.sections;
    }
    return [];
  }

  return getRuReportSections(slug);
}

export function getVsm1TrackReportSections(locale: ProjectDetailLocale): ProjectReportSection[] {
  return reportSections("vsm-1-track-elements", locale);
}

export function getLowIntensityReportSections(
  locale: ProjectDetailLocale,
  group: "intro" | "details",
): ProjectReportSection[] {
  return reportSections("project-0009-low-intensity", locale).filter(
    (section) => section.group === group,
  );
}

export function getLowIntensityConfigurationAlt(locale: ProjectDetailLocale): string {
  if (locale === "en") {
    const report = projectDetailEn.reports["project-0009-low-intensity"] as {
      configurationAlt: string;
    };
    return report.configurationAlt;
  }
  return "Схема конфигураций подвижного состава для малоинтенсивных линий";
}

export function getTrackV25ReportSections(
  locale: ProjectDetailLocale,
  group: "intro" | "details",
): ProjectReportSection[] {
  return reportSections("track-resource-2-5b", locale).filter((section) => section.group === group);
}

export function getTrackV25FieldCopy(locale: ProjectDetailLocale): TrackV25FieldCopy {
  if (locale === "en") {
    return projectDetailEn.reports["track-resource-2-5b"].fieldWorks as TrackV25FieldCopy;
  }
  return getRuTrackV25FieldCopy();
}

export function getTrackV25ModelingCopy(locale: ProjectDetailLocale): TrackV25ModelingCopy {
  if (locale === "en") {
    return projectDetailEn.reports["track-resource-2-5b"].modeling as TrackV25ModelingCopy;
  }
  return getRuTrackV25ModelingCopy();
}

export function getTrackFasteningCalculationsCopy(
  locale: ProjectDetailLocale,
): TrackFasteningCalculationsCopy {
  if (locale === "en") {
    return projectDetailEn.reports["vsm-1-track-elements"].calculations as TrackFasteningCalculationsCopy;
  }
  return getRuTrackFasteningCalculationsCopy();
}

function getRuReportSections(slug: string): ProjectReportSection[] {
  switch (slug) {
    case "vsm-1-track-elements":
      return getRuVsm1Sections();
    case "project-0009-low-intensity":
      return getRuLowIntensitySections();
    case "track-resource-2-5b":
      return getRuTrackV25Sections();
    default:
      return [];
  }
}

function getRuVsm1Sections(): ProjectReportSection[] {
  return [
    {
      id: "fastening",
      title: "Узел промежуточного рельсового скрепления для ВСЖМ-1",
      paragraphs: [
        "АО «ИЦ ЖТ» выполняет комплекс мероприятий по разработке узла промежуточного рельсового скрепления для верхнего строения пути ВСЖМ-1.",
      ],
      bullets: [
        "проведен бенчмаркинг аналогов и определен прототип; разработан комплект конструкторской документации;",
        "изготовлены опытные образцы; проведены лабораторные, стендовые и предварительные испытания - документации присвоена литера «О»;",
        "изготовлены образцы для укладки на испытательном полигоне Саблино - Тосно Октябрьской ж.д.;",
        "ведется постановка узла на производство по ГОСТ 33477-2015.",
      ],
      metrics: [
        {
          value: "сентябрь 2026",
          unit: "",
          label: "План получения сертификата соответствия на узел скрепления для ВСЖМ-1",
        },
        {
          value: "конец 2026",
          unit: "г.",
          label: "Укладка опытных образцов и испытания на полигоне Саблино - Тосно",
        },
      ],
    },
    {
      id: "variable-stiffness",
      title: "Элементы верхнего строения для участков переменной жесткости",
      paragraphs: [
        "Параллельно выполняется разработка и изготовление элементов для участков переменной жесткости. На базе ПМС-88 идет сборка рельсошпальной решетки для укладки и испытаний на полигоне Саблино - Тосно; выполняются приемочные испытания с присвоением литеры «О1».",
      ],
      bullets: [
        "разработана конструкторская документация на железобетонную шпалу и узел крепления дополнительных рельсов ИЦП 5;",
        "проведен комплекс испытаний, включая предварительные (заводские); документации присвоена литера «О»;",
        "опытные образцы элементов ВСП переданы на сборку рельсошпальной решетки (ПМС-88).",
      ],
      metrics: [
        {
          value: "март 2027",
          unit: "",
          label: "Плановый срок завершения работ",
        },
      ],
    },
  ];
}

function getRuLowIntensitySections(): ProjectReportSection[] {
  return [
    {
      id: "about",
      group: "intro",
      title: "О проекте",
      paragraphs: [
        "АО «ИЦ ЖТ» по заказу ОАО «РЖД» ведет разработку низкопольного подвижного состава для эксплуатации на малоинтенсивных линиях ОАО «РЖД». Утверждено рабочее наименование модельного ряда разрабатываемого ПС: рельсовый автобус РА11 — одновагонное исполнение; рельсовый автобус РА12 — двухвагонное исполнение; рельсовый автобус РА13 — двухвагонное исполнение с салонами вагонов повышенной комфортности.",
        "На текущий момент разработано техническое задание на РА12 и ведется разработка технического проекта.",
        "Прогнозируемые объемы серийного производства рельсовых автобусов составляют 300 вагонов (75 вагонов в год в течение 4 лет) для эксплуатации на малоинтенсивных линиях сети железных дорог ОАО «РЖД».",
        "Создание современного подвижного состава для организации перевозки пассажиров на малоинтенсивных участках сети ОАО «РЖД» решает острую социальную проблему транспортной доступности к отдаленным населенным пунктам жителей страны.",
      ],
    },
    {
      id: "configurations",
      group: "details",
      title: "Конфигурации подвижного состава",
      bulletsPlacement: "slot",
      paragraphs: [
        "По результатам анализа данных о маршрутной сети и объемах пассажирских перевозок на малодеятельных железнодорожных линиях, планируется разработка и внедрение двух типов подвижного состава:",
      ],
      bullets: [
        "Для использования на маршрутах протяженностью до 50 км одновагонного МВПС с энергетической установкой на базе перезаряжаемого накопителя энергии и вспомогательной дизель-генераторной установки; с числом мест для сидения 58 и расчетной вместимостью (число мест плюс 3 чел./м² стоящих на свободной площади пассажиров) 93 человека в компоновке салона 3-го класса (схема сидений 3+2);",
        "Для использования на маршрутах протяженностью свыше 50 км двухсекционного МВПС с бустерной секцией с двумя дизель-генераторными установками, расположенными в бустерной секции с числом мест для сидения 126 и расчетной вместимостью 192 человека в компоновке салона 3-го класса.",
      ],
      metrics: [
        {
          value: "58",
          unit: "→ 93",
          label: "Одновагонный МВПС: мест для сидения и расчетная вместимость, чел.",
        },
        {
          value: "126",
          unit: "→ 192",
          label: "Двухсекционный МВПС: мест для сидения и расчетная вместимость, чел.",
        },
        {
          value: "до 50",
          unit: "км",
          label: "Маршруты одновагонной конфигурации",
        },
      ],
    },
    {
      id: "platform",
      group: "details",
      title: "Требования к платформе",
      paragraphs: [
        "Ключевым параметром для обоих типов подвижного состава является пониженный уровень пола, обеспечивающий безбарьерный доступ (без ступенек и лестниц) пассажиров в подвижной состав при посадке и высадке на железнодорожных линиях, оборудованных низкими пассажирскими платформами номинальной высотой 200 мм. Также предусматривается возможность посадки пассажиров с уровня «земли».",
      ],
      metrics: [
        {
          value: "200",
          unit: "мм",
          label: "Номинальная высота низких пассажирских платформ",
        },
      ],
    },
    {
      id: "context",
      group: "details",
      title: "Контекст программы",
      paragraphs: [
        "Внутри ОАО «РЖД» инициирован проект создания низкопольного подвижного состава для эксплуатации на малоинтенсивных участках сети ОАО «РЖД».",
        "Новый подвижной состав создается на замену выбывающему парку рельсовых автобусов: существующий парк дизель-поездов ДТ1, РА1, РА2 в период с 2030 по 2040 г. будет выведен из эксплуатации ввиду окончания их срока службы, а выпуск разработанной на их замену модификации РА3 был остановлен АО «Трансмашхолдинг» (ТМХ) в 2022 году из-за отсутствия на рынке ключевых компонентов (силовая установка подвагонного исполнения). Возобновление выпуска данного подвижного состава в среднесрочной перспективе не планируется. В настоящее время АО «ТМХ» разрабатывает платформу низкопольного ПС составностью от 3х вагонов и выше, эксплуатация которого на малоинтенсивных линиях нерациональна.",
        "С учетом этого в ОАО «РЖД» принято решение о создании собственными силами подвижного состава в одно- и двухвагонной конфигурации, отвечающего требованиям эксплуатации на малоинтенсивных линиях.",
        "На текущий момент сеть ОАО «РЖД» составляет 85,6 тысяч километров. Из них 360 линий, протяженностью 15,47 тыс. км, являются малоинтенсивными участками. Почти половина всех малоинтенсивных линий имеет социальное и оборонное значение. Также, согласно проведенным маркетинговым исследованиям, необходима организация перевозок на новых маршрутах малоинтенсивных линий, для которых потребуется новый подвижной состав. В связи с этим требуется создание принципиально нового подвижного состава для эффективной эксплуатации на малоинтенсивных участках.",
      ],
      metrics: [
        {
          value: "2030",
          unit: "- 2040",
          label: "Период вывода из эксплуатации парка ДТ1, РА1 и РА2",
        },
      ],
    },
    {
      id: "participants",
      group: "details",
      title: "Участники проекта",
      paragraphs: ["Заказчик – ОАО «РЖД». Разработчик – АО «ИЦ ЖТ»."],
    },
  ];
}

function getRuTrackV25Sections(): ProjectReportSection[] {
  return [
    {
      id: "about",
      group: "intro",
      title: "О проекте",
      paragraphs: [
        "АО «Инжиниринговый центр железнодорожного транспорта» (ИЦ ЖТ) создал специализированное подразделение по разработке перспективных решений в путевой инфраструктуре. В рамках реализации программы ОАО «РЖД» по созданию конструкции и технологий содержания железнодорожного пути, обеспечивающих наработку 2,5 млрд тонн брутто подразделение выступает разработчиком конструкции, ее элементов и регламентов содержания, а также координатором работ всех участников проекта.",
        "Цель программы - снизить стоимость жизненного цикла железнодорожного пути на особогрузонапряженных участках за счет увеличения наработки между капитальными и промежуточными ремонтами пути. Реализация НИОКР и внедрение технологий содержания инновационной конструкции пути ведутся в период 2021-2026 гг.",
      ],
    },
    {
      id: "focus",
      group: "intro",
      title: "Основные направления работ",
      bulletLayout: "focusGrid",
      bullets: [
        "Разработка элементов конструкции железнодорожного пути, обладающих улучшенными эксплуатационными и ресурсными характеристиками;",
        "Решение комплексной задачи синергии технических характеристик элементов пути в единой конструкции;",
        "Создание системы технического обслуживания и мониторинга, позволяющей эффективно поддерживать надежность конструкции пути.",
      ],
    },
    {
      id: "requirements",
      group: "details",
      title: "Ремонтные схемы",
      paragraphs: [
        "Предварительные ремонтные схемы определяются Техническими требованиями к конструкции железнодорожного пути и системе технического обслуживания.",
        "Ключевые целевые показатели:",
      ],
      metrics: [
        {
          value: "2,5",
          unit: "млрд т",
          label: "Целевой пропущенный тоннаж брутто между капитальными ремонтами пути",
        },
        {
          value: "225 → 450",
          unit: "млн т",
          label: "Наработка между промежуточными видами ремонтных работ",
        },
        {
          value: "233 → 350",
          unit: "млн т",
          label: "Для участков со сложным планом и профилем",
        },
      ],
    },
    {
      id: "partners",
      group: "details",
      title: "Экосистема компетенций",
      paragraphs: [
        "Проект является сложным и наукоемким; для его осуществления привлечены ведущие российские центры компетенций по направлениям:",
      ],
      bullets: [
        "проектно-конструкторское бюро по инфраструктуре (ПКБ И);",
        "профильные научные организации и высшие учебные заведения: ВНИИЖТ, РУТ (МИИТ), ПГУПС, СГУПС, ИЦ ВЭИП и Санкт-Петербургский политехнический университет Петра Великого;",
        "производители и разработчики элементов и конструкций верхнего строения пути: ЕВРАЗ, Новосибирский и Муромский стрелочные заводы, «РЖДстрой», «БетЭлТранс» (БЭТ) и другие.",
      ],
    },
    {
      id: "rollout",
      group: "details",
      title: "Перспектива тиражирования",
      paragraphs: [
        "Укладку (тиражирование) новых, наиболее эффективных в соответствии с технико-экономическим обоснованием конструкций железнодорожного пути планируется начать на особогрузонапряженных участках пути сети железных дорог ОАО «РЖД» с 2027 года.",
        "Перспективным полигоном укладки разработанной инновационной конструкции являются все особогрузонапряженные участки пути сети железных дорог ОАО «РЖД» - более 17 тыс. км.",
      ],
    },
  ];
}

function getRuTrackV25FieldCopy(): TrackV25FieldCopy {
  return {
    heading: "Технологическое внедрение",
    intro:
      "Три последовательных этапа: сборка рельсошпальной решетки на базе путевой машинной станции, подготовка основания по технологии холодного ресайклинга и укладка решетки на линии Красноярской железной дороги.",
    stages: [
      {
        id: "assembly",
        title: "Сборка рельсошпальной решетки на ПМС",
        description:
          "Сборка рельсошпальной решетки (РШР) со скреплениями разработки ИЦ ЖТ на базе путевой машинной станции (ПМС).",
      },
      {
        id: "sub-ballast",
        title: "Подготовка основания и устройство ПЗС",
        description:
          "Подготовка к снятию старой рельсошпальной решетки (РШР) и последующее устройство нового подбалластного защитного слоя (ПЗС) по технологии холодного ресайклинга. Технологический процесс устройства ПЗС разработан ИЦ ЖТ.",
      },
      {
        id: "laying",
        title: "Укладка рельсошпальной решетки на линии",
        description:
          "Укладка рельсошпальной решетки (РШР) со скреплениями разработки ИЦ ЖТ на участке Заозерный - Камала Красноярской железной дороги.",
      },
    ],
  };
}

function getRuTrackV25ModelingCopy(): TrackV25ModelingCopy {
  return {
    heading: "Математическое моделирование, расчеты конструкций пути",
    intro:
      "В процессе реализации проекта существенное внимание уделяется математическому моделированию. Разработан и используется для проектирования и расчетов инновационных конструкций железнодорожного пути комплекс математических моделей; все модели валидированы на основе экспериментов ВНИИЖТ, МИИТ и ИЦ ВЭИП.",
    blocks: [
      {
        title: "Определение нагрузок на путь, его узлы и элементы",
        body: "Моделирование приложения усилий от подвижного состава к рельсам и узлам; оцениваются зоны контакта и интегральная картина нагружения по длине рассмотренного участка.",
      },
      {
        title: "Расчет конструкции пути",
        body: "Конечно-элементная модель участка верхнего строения: рельсы, шпалы, балластное ложе и ограничения опирания; задаются нагрузки и условия закрепления для проверки несущей способности схемы.",
      },
      {
        title: "Расчет узлов и элементов пути",
        body: "Детализированная проверка узлов скрепления и стыков элементов по напряженно-деформированному состоянию; рассматриваются узлы контакта деталей и реакции в зонах максимальных концентраторов усилий.",
      },
      {
        title: "Геотехнические расчеты",
        body: "Поперечные сечения насыпи или основания с разбивкой на конечные элементы: нагрузки от верхнего строения, граничные условия и распределение напряжений (или перемещений) в массиве грунта.",
      },
      {
        title: "Оптимизация параметров конструкции пути и его элементов",
        body: "Сопоставление вариантов геометрии элементов скрепления и верхнего строения по целевым показателям (напряженное состояние, жесткость узла и др.); результат отображается в виде графиков и эталонной геометрии узла.",
      },
    ],
  };
}

function getRuTrackFasteningCalculationsCopy(): TrackFasteningCalculationsCopy {
  return {
    heading: "Математическое моделирование и проектные расчеты",
    intro:
      "Для программы ЭВС 360 расчетный контур связывает состав, путь и элементы крепления: от формы клеммы до поведения узла в составе верхнего строения пути.",
    directions: [
      {
        title: "Расчеты клеммы",
        body: "Поиск оптимальной формы клеммы с учетом долговечности, собственной частоты и усилия прижатия. Отдельно оценивается проектная жесткость узла скрепления.",
      },
      {
        title: "Взаимодействие пути и подвижного состава",
        body: "Расчет нагрузок от подвижного состава на узел, учет динамики пути и различных сценариев взаимодействия поезда с инфраструктурой.",
      },
      {
        title: "Расчеты узла",
        body: "Проверка узла скрепления на прочность и долговечность с использованием расчетной сетки и инженерной модели контакта элементов.",
      },
      {
        title: "Узел в составе пути",
        body: "Расчет узла в составе верхнего строения пути, оценка жесткости рельсовой нити и модуля упругости подрельсового основания.",
      },
    ],
  };
}
