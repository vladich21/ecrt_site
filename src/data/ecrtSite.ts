import coverKs400 from '../assets/presentation/ks-test.webp'
import coverKs400Model from '../assets/mat-model_ks/cover.webp'
import galleryKs2 from '../assets/presentation/ks-2.webp'
import galleryKs3 from '../assets/presentation/ks-3.webp'
import galleryKs4 from '../assets/presentation/ks-4.webp'
import galleryKs5 from '../assets/presentation/ks-5.webp'
import type { StaticImageData } from 'next/image'

import { activityGroups as activityGroupsRu, type ActivityThemeGroup } from './activityDirectionsRu'

export type NavLabelKey =
  | 'nav.home'
  | 'nav.about'
  | 'nav.projects'
  | 'nav.careers'
  | 'nav.purchase'
  | 'nav.documents'
  | 'nav.contacts'

export type NavItem = { href: string; labelKey: NavLabelKey }

export const navItems: readonly NavItem[] = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/about-us', labelKey: 'nav.about' },
  { href: '/projects', labelKey: 'nav.projects' },
  { href: '/careers', labelKey: 'nav.careers' },
  { href: '/purchase', labelKey: 'nav.purchase' },
  { href: '/documents', labelKey: 'nav.documents' },
  { href: '/contacts', labelKey: 'nav.contacts' },
]

export const homeProjectsText =
  'Пилот - разработка высокоскоростного электропоезда для первой линии ВСМ Москва - Санкт-Петербург. Параллельно ведутся направления по контактной сети (модель и комплекс КС-400), водородной тяге и увеличению ресурса пути (целевой ориентир 2,5 млрд т брутто). Детали - в соответствующих блоках ниже и на странице «Проекты».'

export type { ActivityThemeGroup }

export const activityGroups = activityGroupsRu
export type BundledImage = string | StaticImageData

export type StrategicProjectSection = {
  title: string
  paragraphs: string[]
}

export type StrategicProjectData = {
  id: string
  slug: string
  title: string
  status: string
  period: string
  coverImage: BundledImage
  gallery: BundledImage[]
  teaser: string
  value: string
  description: string
  bullets: string[]
  sections?: StrategicProjectSection[]
  omitHeroPhaseLine?: boolean
  details: string[]
}

export const strategicProjects: StrategicProjectData[] = [
  {
    id: 'ks400-model',
    slug: 'ks-400-model',
    title: 'Математическая модель контактной сети',
    status: 'Проведение испытаний и валидация математической модели',
    period: '2023 - 2027',
    omitHeroPhaseLine: true,
    coverImage: coverKs400Model,
    gallery: [
      coverKs400Model,
      galleryKs2,
      galleryKs3,
      galleryKs4,
      galleryKs5,
    ],
    teaser:
      'Математическая модель контактной сети позволяет проводить конечно-элементные расчёты по статическим показателям контактной сети и по динамике взаимодействия контактной сети с токоприемником электроподвижного состава',
    value:
      'Расчёты по модели уточняют параметры узлов и конструкций КС под расчётные скорости и качество токосъёма до стройки и пуска линии.',
    description:
      'Модель предназначена для применения при разработке технических решений, проектировании и эксплуатации контактной сети на всех электрифицированных участках сети железных дорог ОАО «РЖД» (в том числе на высокоскоростной линии Москва - Санкт-Петербург) и определения (уточнения) наиболее рациональных параметров узлов и конструкций контактной сети (таких как контактная подвеска, сопряжения анкерных участков, средняя анкеровка, воздушные стрелки, опорные и поддерживающие конструкции, элементы арматуры и т.д.) с учётом обеспечения требований к качеству токосъёма при расчётных скоростях движения.',
    bullets: [
      'Модель контактной сети: стержневая, имеет распределённые параметры, построена на основе метода конечных элементов с моделированием контактной подвески, опорных, поддерживающих и других конструкций, а также проводов различного назначения в единой системе в статике и динамике',
      'Модели токоприёмника: двух-, трёх- и четырёхмассовые с сосредоточенными параметрами, с абсолютно твёрдыми телами, построенные на основе динамики многотельных систем, и комбинированные',
      'Модель взаимодействия: на основе решения контактной задачи методом штрафа',
    ],
    sections: [
      {
        title: 'Верификация по EN 50318:2018+A1:2022',
        paragraphs: [
          'Проверка на эталонных моделях согласно EN 50318:2018 осуществлялась для двух вариантов моделей: нерессорная и рессорная подвеска переменного тока. Динамическое моделирование взаимодействия токоприёмников выполнялось при скоростях движения 275 и 320 км/ч.',
          'Верификация на основе сравнения с результатами натурных испытаний, приведёнными в стандарте EN 50318:2018, выполнялась для двух вариантов: нерессорная и рессорная контактная подвеска переменного тока. Модели контактных подвесок состояли из трёх анкерных участков, а расчётные участки для анализа имели протяжённость более километра с числом пролётов по 22 для каждой модели.',
        ],
      },
      {
        title: 'Валидация статической математической модели контактной сети КС-400 на ЭК АО «ВНИИЖТ»',
        paragraphs: [
          'Валидация статической математической модели контактной сети КС-400 по результатам эксплуатационных испытаний комплекса изделий контактной сети КС-400 на экспериментальном кольце АО «ВНИИЖТ» выполнена на основе сравнения результатов расчётов эластичности контактной подвески с данными, полученными в результате натурных испытаний. Сравнение значений эластичности производилось под каждой струной и в межструновых пролётах рассматриваемых пролётов контактной подвески. Максимальная разница в значениях эластичности во всех контрольных точках составила 9,5 %, среднее отклонение - 3 %.',
        ],
      },
    ],
    details: [],
  },
  {
    id: 'ks400-products',
    slug: 'ks-400-catenary',
    title: 'Комплекс изделий КС-400',
    status: 'Постановка на производство',
    period: '2021 - 2027',
    omitHeroPhaseLine: true,
    coverImage: coverKs400,
    gallery: [galleryKs2, galleryKs3, galleryKs4, galleryKs5],
    teaser:
      'ОКР комплекса изделий КС-400 для ВСМ: конструкции, испытания, опытный полигон на ЭК ВНИИЖТ и аварийных режимах.',
    value:
      'Комплекс изделий контактной сети КС-400 обеспечивает надежную передачу энергии к токоприемникам поезда при скоростях до 400 км/ч',
    description:
      'Комплекс изделий предназначен для сооружения железнодорожной контактной сети КС-400, обеспечивающий надежную передачу электрической энергии от тяговых подстанций и линейных устройств энергоснабжения к токоприемникам электроподвижного состава при скоростях движения поезда до 400 км/ч.\n\nВ 2026 году завершены опытные испытания на экспериментальном кольце АО «ВНИИЖТ»; конструкторской документации присвоена литера «О1». Сейчас ведется совместная работа с ОАО «РЖД» по постановке на производство элементов контактной сети КС-400.',
    bullets: [
      'В рамках ОКР АО «ИЦ ЖТ» разработаны строительные конструкции, узлы анкеровки, поддерживающие и фиксирующие конструкции, арматура и струны, изоляторы, конструкции для заземления и обратной тяговой сети КС-400',
      'Изготовлены опытные образцы; проведены предварительные, эксплуатационные и приемочные испытания с итеративным совершенствованием конструкторской документации и успешными приемочными комиссиями',
    ],
    sections: [
      {
        title: 'Объем ОКР и испытания',
        paragraphs: [
          'Разработка комплекса изделий контактной сети КС-400 ведется для первой линии ВСМ Москва - Санкт-Петербург.',
          'В рамках ОКР специалистами АО «ИЦ ЖТ» были разработаны строительные конструкции, узлы анкеровок, поддерживающие и фиксирующие конструкции, арматура и струны, изоляторы, конструкции для заземления и обратной тяговой сети контактной сети КС-400. Были изготовлены опытные образцы; проведены предварительные, эксплуатационные и приемочные испытания элементов комплекса изделий.',
          'На протяжении всех работ постоянно совершенствовалась конструкторская документация, в связи с чем успешно были проведены приемочные комиссии.',
        ],
      },
      {
        title: 'Опытный полигон контактной сети КС-400 на ЭК АО «ВНИИЖТ»',
        paragraphs: [
          'Особое внимание уделено опытному полигону контактной сети КС-400 на Экспериментальном кольце АО «ВНИИЖТ».',
          'Специалистами АО «ИЦ ЖТ», в том числе с использованием разработанной математической модели, и строительным блоком ОАО «РЖД» получены уникальные результаты по высокоточной регулировке контактной подвески и точным строительным и монтажным работам, что позволило достичь проектных положений при жестких допусках.',
        ],
      },
      {
        title: 'Эксплуатационные испытания и аварийные режимы',
        paragraphs: [
          'На ЭК АО «ВНИИЖТ» в рамках эксплуатационных испытаний проведены эксперименты по анализу работы контактной подвески КС-400 в аварийных режимах.',
        ],
      },
    ],
    details: [],
  },
]

export function getStrategicProjectBySlug(slug: string) {
  return strategicProjects.find((project) => project.slug === slug)
}

export type DocumentSectionId = 'anticorruption' | 'quality' | 'labor' | 'hotline'

export type DocumentGroupId = 'policies' | 'certificates' | 'corporate' | 'sout'

export type SiteDocumentLink = {
  readonly url: string
  readonly nameRu: string
  readonly nameEn: string
  readonly section: DocumentSectionId
  readonly group?: DocumentGroupId
  readonly placement?: 'afterContractorNote'
}

export const documentSectionOrder: readonly DocumentSectionId[] = [
  'anticorruption',
  'quality',
  'labor',
  'hotline',
]

const documentBase = '/documents'

export const documents: readonly SiteDocumentLink[] = [
  {
    url: `${documentBase}/anti_corr.pdf`,
    nameRu: 'Антикоррупционная политика',
    nameEn: 'Anti-corruption policy',
    section: 'anticorruption',
  },
  {
    url: `${documentBase}/anti_corr_clause.docx`,
    nameRu: 'Антикоррупционная оговорка',
    nameEn: 'Anti-corruption clause',
    section: 'anticorruption',
    placement: 'afterContractorNote',
  },
  {
    url: `${documentBase}/perechen.pdf`,
    nameRu: 'Перечень рекомендуемых мероприятий по улучшению условий труда',
    nameEn: 'Recommended workplace-condition improvement measures - activities list',
    section: 'labor',
    group: 'sout',
  },
  {
    url: `${documentBase}/vedomost.pdf`,
    nameRu: 'Сводная ведомость результатов проведения СОУТ',
    nameEn: 'Occupational workplace conditions assessment - summary statement of results',
    section: 'labor',
    group: 'sout',
  },
]
