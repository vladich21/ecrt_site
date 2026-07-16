export type Evs360Metric = {
  value: string;
  unit: string;
  label: string;
};

export const evs360CharacteristicsHeading = "Характеристики поезда";

export const evs360CharacteristicsIntro =
  "Электропоезд предназначен для эксплуатации на первой линии ВСМ «Москва - Санкт-Петербург». Предусмотрено двухсистемное исполнение для постоянного тока 3 кВ и переменного тока 25 кВ.";

export type Evs360ServiceClass = {
  name: string;
};

export const evs360ServiceClassesHeading = "Классы обслуживания";

export const evs360ServiceClassesIntro =
  "В составе предусмотрены четыре уровня комфорта для пассажиров. Также предусмотрены купе-переговорные. Дизайн прорабатывается с учетом современных тенденций и опыта эксплуатации электропоезда «Сапсан».";

export const evs360ServiceClassLabel = "класс обслуживания";

export const evs360ServiceClasses: readonly Evs360ServiceClass[] = [
  { name: "Первый" },
  { name: "Бизнес" },
  { name: "Комфорт" },
  { name: "Стандарт" },
];

export const evs360CharacteristicsBullets: readonly string[] = [];

export const evs360CharacteristicsMetrics: readonly Evs360Metric[] = [
  { value: "400", unit: "км/ч", label: "Максимальная скорость на ВСМ" },
  { value: "360", unit: "км/ч", label: "Эксплуатационная скорость" },
  { value: "8", unit: "вагонов", label: "Составность с возможностью сдвоенной эксплуатации" },
  { value: "452", unit: "чел.", label: "Общая пассажировместимость" },
  { value: "−40…+40", unit: "°С", label: "Диапазон температур эксплуатации" },
];

export const evs360ScheduleHeading = "График и ключевые вехи";

export const evs360ScheduleIntro =
  "Головным разработчиком является АО «ИЦ ЖТ» - с 2020 года выполняется разработка конструкторской документации по договору с ОАО «РЖД». Проектирование ведется по согласованному плану работ. В апреле 2024 года подписан договор на поставку двух головных образцов с фиксацией сроков передачи КД заводу-изготовителю.";

export const evs360ScheduleParagraphs: readonly string[] = [];

export const evs360ScheduleMetrics: readonly Evs360Metric[] = [
  { value: "2023", unit: "", label: "Эскизный проект" },
  { value: "2024", unit: "", label: "Технический проект" },
  { value: "2025", unit: "", label: "Начало изготовления компонентов" },
  { value: "2026", unit: "", label: "Начало сварки и сборки первых кузовов поезда" },
  { value: "2027–2028", unit: "", label: "Испытания и сертификация" },
];

export const evs360ScaleHeading = "Масштаб программы";

export const evs360ScaleIntro =
  "Производство первого высокоскоростного поезда ведется на базе отечественных разработок. Для отдельных систем выполняется разработка новых конструкций и технологий. Изготовитель электропоезда - завод «Уральские локомотивы». К проекту подключены предприятия «Трансмашхолдинга».";

export const evs360ScaleMetrics: readonly Evs360Metric[] = [
  { value: "36", unit: "систем", label: "Новых систем для высокоскоростного электропоезда" },
  { value: ">10 000", unit: "деталей", label: "Составных частей в конструкции поезда" },
  { value: "160+", unit: "организаций", label: "Предприятий, НИИ и КБ, задействованных в разработке и производстве" },
];

export const evs360SourceNote =
  "Характеристики и показатели - по материалам круглого стола «О ходе подготовки отраслей российской промышленности к реализации проекта ВСМ Москва - Санкт-Петербург», Совет Федерации, 9 декабря 2024 г.";
