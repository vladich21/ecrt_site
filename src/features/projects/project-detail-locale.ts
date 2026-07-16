import type { Locale } from "@/content/i18n/locale";
import homeEn from "@/locales/en/home.json";
import homeRu from "@/locales/ru/home.json";
import projectDetailEn from "@/locales/en/project-detail.json";
import projectDetailRu from "@/locales/ru/project-detail.json";
import { getStrategicProjectBySlug } from "@/data/ecrtSite";
import { getProjectBySlug } from "@/data/projects";
import {
  evs360CharacteristicsBullets,
  evs360CharacteristicsHeading,
  evs360CharacteristicsIntro,
  evs360CharacteristicsMetrics,
  evs360ServiceClassLabel,
  evs360ServiceClasses,
  evs360ServiceClassesHeading,
  evs360ServiceClassesIntro,
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

export type ProjectDetailLocale = Locale;

export type ProjectDetailUi = typeof projectDetailRu.ui;
export type ProjectDetailSliderUi = typeof projectDetailRu.slider;
export type ProjectDetailMeta = typeof projectDetailRu.meta;

type StringList = string[];

export type LocalizedCatalogProject =
  (typeof projectDetailEn.catalog)[keyof typeof projectDetailEn.catalog];

type StrategicProjectBase = (typeof projectDetailEn.strategic)[keyof typeof projectDetailEn.strategic];
export type LocalizedStrategicProject = Omit<
  StrategicProjectBase,
  "bullets" | "details" | "sections"
> & {
  bullets: StringList;
  details: StringList;
  sections: Array<{ title: string; paragraphs: StringList }>;
};

type Evs360ReportCopyBase = (typeof projectDetailEn.reports)["evs-360"];
export type Evs360ReportCopy = Omit<
  Evs360ReportCopyBase,
  "characteristicsBullets" | "scheduleParagraphs"
> & {
  characteristicsBullets: StringList;
  scheduleParagraphs: StringList;
};

type TrackV25FieldCopyBase =
  (typeof projectDetailEn.reports)["track-resource-2-5b"]["fieldWorks"];
export type TrackV25FieldCopy = Omit<TrackV25FieldCopyBase, "stages"> & {
  stages: Array<TrackV25FieldCopyBase["stages"][number] & { locationNote?: string }>;
};

export type TrackV25ModelingCopy =
  (typeof projectDetailEn.reports)["track-resource-2-5b"]["modeling"];
export type TrackV25OperationalTestingCopy =
  (typeof projectDetailEn.reports)["track-resource-2-5b"]["operationalTesting"];
export type TrackFasteningCalculationsCopy =
  (typeof projectDetailEn.reports)["vsm-1-track-elements"]["calculations"];

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
  if (slug === "track-resource-2-5b") {
    return locale === "en"
      ? homeEn.projects.showcaseTrackV25Title
      : homeRu.projects.showcaseTrackV25Title;
  }

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
    return projectDetailEn.catalog[slug as keyof typeof projectDetailEn.catalog] ?? null;
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
    return projectDetailEn.strategic[slug as keyof typeof projectDetailEn.strategic] ?? null;
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

export function getKs400ModelVideoCopy(locale: ProjectDetailLocale) {
  if (locale === "en") {
    return projectDetailEn.reports["ks-400-model"].video;
  }

  return {
    title: "Проезд поезда на испытательном кольце",
    lead: "Видеозапись натурного проезда - как токоприёмник взаимодействует с контактной сетью в ходе проверки модели.",
    ariaLabel: "Видео: проезд поезда на испытательном кольце",
  };
}

export function getEvs360ReportCopy(locale: ProjectDetailLocale): Evs360ReportCopy {
  if (locale === "en") {
    return projectDetailEn.reports["evs-360"] as Evs360ReportCopy;
  }

  return {
    characteristicsHeading: evs360CharacteristicsHeading,
    characteristicsIntro: evs360CharacteristicsIntro,
    characteristicsBullets: [...evs360CharacteristicsBullets],
    characteristicsMetrics: [...evs360CharacteristicsMetrics],
    serviceClassesHeading: evs360ServiceClassesHeading,
    serviceClassesIntro: evs360ServiceClassesIntro,
    serviceClassLabel: evs360ServiceClassLabel,
    serviceClasses: [...evs360ServiceClasses],
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
    const entry = projectDetailEn.reports[slug as keyof typeof projectDetailEn.reports];
    if (entry && "sections" in entry && entry.sections) {
      return entry.sections as ProjectReportSection[];
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
    return projectDetailEn.reports["project-0009-low-intensity"].configurationAlt;
  }
  return "Схема конфигураций подвижного состава для малоинтенсивных линий";
}

export function getTrackV25ReportSections(
  locale: ProjectDetailLocale,
  group: "intro" | "details",
  sectionIds?: string[],
): ProjectReportSection[] {
  let sections = reportSections("track-resource-2-5b", locale).filter((section) => section.group === group);

  if (sectionIds?.length) {
    const byId = new Map(sections.map((section) => [section.id, section]));
    sections = sectionIds.flatMap((id) => {
      const section = byId.get(id);
      return section ? [section] : [];
    });
  }

  return sections;
}

export function getTrackV25FieldCopy(locale: ProjectDetailLocale): TrackV25FieldCopy {
  if (locale === "en") {
    return projectDetailEn.reports["track-resource-2-5b"].fieldWorks;
  }
  return getRuTrackV25FieldCopy();
}

export function getTrackV25ModelingCopy(locale: ProjectDetailLocale): TrackV25ModelingCopy {
  if (locale === "en") {
    return projectDetailEn.reports["track-resource-2-5b"].modeling;
  }
  return getRuTrackV25ModelingCopy();
}

export function getTrackV25OperationalTestingCopy(
  locale: ProjectDetailLocale,
): TrackV25OperationalTestingCopy {
  if (locale === "en") {
    return projectDetailEn.reports["track-resource-2-5b"].operationalTesting;
  }
  return getRuTrackV25OperationalTestingCopy();
}

export function getTrackFasteningCalculationsCopy(
  locale: ProjectDetailLocale,
): TrackFasteningCalculationsCopy {
  if (locale === "en") {
    return projectDetailEn.reports["vsm-1-track-elements"].calculations;
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
      paddingTopPx: 80,
      title: "Узел промежуточного рельсового скрепления для ВСМ",
      paragraphs: [
        "АО «ИЦ ЖТ» выполняет комплекс мероприятий по разработке узла промежуточного рельсового скрепления для верхнего строения пути ВСМ.",
      ],
      bullets: [
        "проведен бенчмаркинг аналогов и определен прототип; разработан комплект конструкторской документации;",
        "изготовлены опытные образцы; проведены лабораторные, стендовые и предварительные испытания - документации присвоена литера «О»;",
        "изготовлены образцы для укладки на испытательном полигоне Саблино - Тосно Октябрьской ж.д.;",
        "ведется постановка узла на производство по ГОСТ 33477-2015.",
      ],
      metrics: [
        {   
          value: "2026",
          unit: "",
          label: "План получения сертификата соответствия на узел скрепления для ВСМ",
        },
        {
          value: "2026",
          unit: "",
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
          value: "2027",
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
      paddingTopPx: 80,
      paragraphs: [
        "АО «ИЦ ЖТ» по заказу ОАО «РЖД» ведет разработку низкопольного подвижного состава для эксплуатации на малоинтенсивных линиях ОАО «РЖД». Утверждено рабочее наименование модельного ряда разрабатываемого ПС:",
        "На текущий момент разработано техническое задание на РА12 и ведется разработка технического проекта.",
        "Прогнозируемые объемы серийного производства рельсовых автобусов составляют 300 вагонов (75 вагонов в год в течение 4 лет) для эксплуатации на малоинтенсивных линиях сети железных дорог ОАО «РЖД».",
        "Создание современного подвижного состава для организации перевозки пассажиров на малоинтенсивных участках сети ОАО «РЖД» решает острую социальную проблему транспортной доступности к отдаленным населенным пунктам жителей страны.",
      ],
      bullets: [
        "рельсовый автобус РА11 — одновагонное исполнение",
        "рельсовый автобус РА12 — двухвагонное исполнение",
        "рельсовый автобус РА13 — двухвагонное исполнение с салонами вагонов повышенной комфортности",
      ],
      bulletsAfterLeadParagraph: true,
    },
    {
      id: "configurations",
      group: "details",
      title: "Конфигурации подвижного состава",
      bulletsPlacement: "slot",
      paragraphs: [
        "По результатам анализа данных о маршрутной сети и объемах пассажирских перевозок на малоинтенсивных железнодорожных линиях, планируется разработка и внедрение двух типов подвижного состава:",
      ],
      bullets: [
        "Для использования на маршрутах протяженностью до 50 км одновагонного МВПС с энергетической установкой на базе перезаряжаемого накопителя энергии и вспомогательной дизель-генераторной установки, с числом мест для сидения 58 и расчетной вместимостью (число мест +3\u00A0чел./\u00A0м² стоящих на свободной площади пассажиров) 93 человека в компоновке салона\u00A03-го\u00A0класса (схема сидений 3+2)",
        "Для использования на маршрутах протяженностью свыше 50 км двухвагонный МВПС с бустерной секцией с двумя дизель-генераторными установками, расположенными в бустерной секции, с числом мест для сидения 126 и расчетной вместимостью 192 человека в компоновке салона\u00A03-го\u00A0класса",
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
          label: "Двухвагонный МВПС: мест для сидения и расчетная вместимость, чел.",
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
  ];
}

function getRuTrackV25Sections(): ProjectReportSection[] {
  return [
    {
      id: "about",
      group: "intro",
      title: "О проекте",
      paddingTopPx: 80,
      paragraphs: [
        "В АО «Инжиниринговый центр железнодорожного транспорта» (ИЦ ЖТ) создано специализированное подразделение по разработке перспективных решений в области путевой инфраструктуры (Центр разработки инфраструктуры).",
        "В рамках реализации проекта ОАО «РЖД» по созданию конструкции и технологий содержания железнодорожного пути, обеспечивающих наработку 2,5 млрд тонн брутто пропущенного тоннажа, Центр выступает разработчиком конструкции, ее элементов и технологий содержания, а также координатором работ всех участников проекта.",
        "Цель проекта - снизить стоимость жизненного цикла железнодорожного пути на особогрузонапряженных участках за счет увеличения наработки пропущенного тоннажа между капитальными и промежуточными ремонтами пути.",
        "Реализация НИОКР и внедрение технологий содержания инновационной конструкции пути проводятся в период с 2021 по 2026 гг.",
      ],
    },
    {
      id: "focus",
      group: "intro",
      title: "Основные направления работ",
      bulletLayout: "focusGrid",
      bullets: [
        "Разработка элементов конструкции железнодорожного пути, обладающих улучшенными эксплуатационными и ресурсными характеристиками",
        "Решение комплексной задачи синергии технических характеристик элементов пути в единой конструкции",
        "Создание системы технического обслуживания и мониторинга, позволяющей эффективно поддерживать надежность конструкции пути",
        "Создание комплекса математических моделей железнодорожного пути",
      ],
    },
    {
      id: "partners",
      group: "intro",
      title: "Экосистема компетенций",
      paragraphs: [
        "Проект является сложным и наукоемким, для его осуществления привлечены ведущие российские центры компетенций по направлениям:",
      ],
      bullets: [
        "проектно-конструкторское бюро по инфраструктуре (ПКБ И);",
        "профильные научные организации и высшие учебные заведения: ВНИИЖТ, РУТ (МИИТ), ПГУПС, СГУПС, ИЦ ВЭИП и Санкт-Петербургский политехнический университет Петра Великого;",
        "производители и разработчики элементов и конструкций верхнего строения пути: ЕВРАЗ, Новосибирский и Муромский стрелочные заводы, «РЖДстрой», «БетЭлТранс» (БЭТ) и другие.",
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
          label: "Увеличение наработки пропущенного тоннажа между промежуточными видами ремонтных работ",
        },
        {
          value: "233 → 350",
          unit: "млн т",
          label: "Увеличение наработки пропущенного тоннажа между промежуточными видами ремонтных работ для участков со сложным планом и профилем",
        },
      ],
      paragraphsAfterMetrics: [
        "Таким образом, в рамках реализации проекта важным является обеспечение соблюдения критериев как по первому предельному состоянию (по прочности и устойчивости), так и по второму предельному состоянию (по обеспечению стабильности положения пути в плане и профиле).",
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
    heading: "Укладка инновационной конструкции железнодорожного пути на действующей инфраструктуре",
    intro:
      "Три последовательных этапа: сборка рельсошпальной решетки на базе путевой машинной станции, подготовка основания по технологии холодного ресайклинга и укладка решетки на участке Красноярской железной дороги.",
    stages: [
      {
        id: "assembly",
        title: "Сборка рельсошпальной решетки на ПМС",
        description:
          "Сборка рельсошпальной решетки (РШР) с промежуточными рельсовыми скреплениями и шпалами, разработанными в рамках реализации проекта, на базе путевой машинной станции (ПМС).",
      },
      {
        id: "sub-ballast",
        title: "Подготовка основания и устройство ПЗС",
        description:
          "Снятие старой рельсошпальной решетки (РШР) с последующим устройством подбалластного защитного слоя (ПЗС) по технологии холодного ресайклинга. Технологический процесс устройства ПЗС разработан ИЦ ЖТ.",
      },
      {
        id: "laying",
        title: "Укладка рельсошпальной решетки на действующей сети железных дорог ОАО «РЖД»",
        description:
          "Укладка инновационной конструкции железнодорожного пути на участке Красноярской железной дороги.",
      },
    ],
  };
}

function getRuTrackV25OperationalTestingCopy(): TrackV25OperationalTestingCopy {
  return {
    heading: "Эксплуатационные испытания",
    paragraphs: [
      "Для проведения эксплуатационных испытаний инновационной конструкции железнодорожного пути осенью 2023 года на Экспериментальном кольце на станции Щербинка выполнены работы по укладке опытных и контрольных участков пути в кривых радиусами 1200, 590 и 400 м. Уложены 13 опытных участков общей протяженностью 650 метров с различной вариативностью рельсошпальной решетки и 5 контрольных участков общей протяженностью 295 метров.",
      "На опытных участках уложен балластный слой из базальтовых горных пород новой фракции от 10 до 63 мм. Также была отработана опытная технология устройства подбалластного защитного слоя методом холодного ресайклинга.",
      "Осенью 2024 года на Экспериментальном кольце на ст. Щербинка для проведения эксплуатационных испытаний выполнена укладка инновационных стрелочных переводов марки 1/11 с непрерывной поверхностью катания с подуклонкой и без подуклонки рельсовых нитей, съезда марки 1/13 с непрерывной поверхностью катания с подуклонкой рельсовых нитей и стыка уравнительного с повышенным ресурсом.",
      "Эксплуатационные испытания инновационной конструкции железнодорожного пути завершены осенью 2025 г.",
    ],
  };
}

function getRuTrackV25ModelingCopy(): TrackV25ModelingCopy {
  return {
    heading: "Математическое моделирование, расчеты конструкций пути",
    intro:
      "В процессе реализации проекта существенное внимание уделяется математическому моделированию. Разработан и используется для проектирования и расчетов инновационных конструкций железнодорожного пути комплекс математических моделей. Все модели валидированы на основе экспериментов, проведенных ВНИИЖТ, МИИТ и ИЦ ВЭИП.",
    testingNote: {
      title: "Испытания и подтверждение характеристик",
      body: "При реализации проекта проведен полный комплекс предварительных (заводских), лабораторных и стендовых испытаний, подтверждающих характеристики разрабатываемой инновационной конструкции пути и ее элементов.",
    },
    blocks: [
      {
        title: "Анализ динамического взаимодействия пути и подвижного состава",
        body: "Многомассовое динамическое моделирование учитывает все нюансы конструкции подвески подвижного состава и верхнего строения пути для определения нагрузок, приходящих от колеса на рельсы.",
      },
      {
        title: "Расчет напряженно-деформированного состояния верхнего строения пути",
        body: "Полученные динамические нагрузки прикладываются к конечно-элементной модели верхнего строения пути для определения прогибов и отжатий рельсовой нити, мгновенных осадок шпал, вертикальных и боковых нагрузок на узлы рельсовых скреплений. Определяется прочность рельсовой нити и устойчивость пути.",
      },
      {
        title: "Расчет на прочность промежуточных рельсовых скреплений и железобетонных шпал",
        body: "Детальные конечно-элементные модели скреплений позволяют определить их поступательные и вращательные жесткости, оценить прочность и деформативность их конструктивных элементов, а также определить ресурс упругих клемм. Детальные модели шпал учитывают преднапряжение армирующих элементов и позволяют определить возможное развитие трещин в бетоне.",
      },
      {
        title: "Геотехническое моделирование подшпального основания",
        body: "Специализированные геотехнические конечно-элементные модели используются для определения деформативности и устойчивости балластной призмы, земляного полотна и основания с учетом возможности усиления основной площадки земляного полотна.",
      },
      {
        title: "Оптимизация элементов верхнего строения пути",
        body: "Многокритериальная параметрическая оптимизация используется для получения трехмерной геометрии упругих клемм с высокими показателями усилия прижатия, усталостной долговечности и собственных частот колебаний. Также оптимизируется армирование железобетонных шпал, требуемые показатели деформативности материалов конструкции пути.",
      },
    ],
  };
}

function getRuTrackFasteningCalculationsCopy(): TrackFasteningCalculationsCopy {
  return {
    heading: "Математическое моделирование и проектные расчеты",
    intro:
      "Для программы первого отечественного высокоскоростного электропоезда расчетный контур связывает состав, путь и элементы крепления: от формы клеммы до поведения узла в составе верхнего строения пути.",
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
