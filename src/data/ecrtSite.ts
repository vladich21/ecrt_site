import coverKs400 from '../assets/presentation/ks-test.webp'
import galleryKs2 from '../assets/presentation/кс-2.webp'
import galleryKs3 from '../assets/presentation/кс-3.webp'
import galleryKs4 from '../assets/presentation/кс-4.webp'
import galleryKs5 from '../assets/presentation/кс-5.webp'
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
  'Пилот - разработка высокоскоростного электропоезда для магистралей. Параллельно ведутся направления по контактной сети (модель и комплекс КС-400), водородной тяге и увеличению ресурса пути (целевой ориентир 2,5 млрд т брутто). Детали - в соответствующих блоках ниже и на странице «Проекты».'

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
    title: 'Математическая модель взаимодействия контактной сети и токоприемника',
    status: 'В работе',
    period: '2022 - 2026',
    coverImage: coverKs400,
    gallery: [
      coverKs400,
      galleryKs2,
      galleryKs3,
      galleryKs4,
      galleryKs5,
    ],
    teaser:
      'Создание математической модели контактной сети и динамического токосъема подвижным составом - для проектирования и эксплуатации на РЖД, включая ВСМ Москва - Санкт-Петербург.',
    value:
      'Расчеты по модели уточняют параметры узлов и конструкций КС под расчетные скорости и качество токосъема до стройки и пуска линии.',
    description:
      'Модель описывает динамику контактной подвески и процесс взаимодействия с токоприемниками. Применима при разработке технических решений, проектировании и эксплуатации контактной сети на электрифицированных участках сети ОАО «РЖД», в том числе на высокоскоростной линии Москва - Санкт-Петербург.',
    bullets: [
      'Подбор рациональных параметров узлов и конструкций КС при расчетных скоростях движения и требованиях к токосъему.',
      'Уточнение требований к комплексу изделий контактных сетей и подтверждение принятых инженерных решений расчетами на модели.',
    ],
    sections: [
      {
        title: 'Назначение модели',
        paragraphs: [
          'Модель предназначена для определения (уточнения) наиболее рациональных параметров узлов и конструкций контактной сети с учетом обеспечения требований к качеству токосъема при расчетных скоростях движения.',
          'Выполнение расчетов позволит уточнить требования к комплексу изделий контактных сетей и подтвердить правильность принимаемых технических решений.',
        ],
      },
      {
        title: 'Область применения',
        paragraphs: [
          'Используется при разработке технических решений, проектировании и эксплуатации контактной сети на всех электрифицированных участках сети железных дорог ОАО «РЖД», в том числе на высокоскоростной линии Москва - Санкт-Петербург.',
        ],
      },
      {
        title: 'Визуализация: прототип токоприемника ЭВС-360 и подвеска КС-400',
        paragraphs: [
          'На представленных иллюстрациях показано моделирование взаимодействия прототипа токоприемника ЭВС-360 с контактной подвеской КС-400.',
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
          'Разработка комплекса изделий контактной сети КС-400 ведется для ВСМ Москва - Санкт-Петербург.',
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
