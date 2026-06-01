import {
  resolveDirectionTitle,
  type DirectionLocale,
} from '@/features/projects/direction-detail-locale'
import {
  resolveProjectTitle as resolveLocalizedProjectTitle,
  type ProjectDetailLocale,
} from '@/features/projects/project-detail-locale'

export type BreadcrumbEntry = {
  label: string
  to?: string
  current?: boolean
}

type Translate = (key: string) => string

export function resolveProjectTitle(slug: string, locale: ProjectDetailLocale = 'ru'): string {
  return resolveLocalizedProjectTitle(slug, locale)
}

/** Страницы с полноширинным темным hero: крошки на скриме, светлый текст (legacy Tilda). */
export function breadcrumbsOverDarkHero(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/') return false
  const prefixes = [
    '/about-us',
    '/projects',
    '/careers',
    '/purchase',
  ] as const
  if ((prefixes as readonly string[]).includes(path)) return true
  return /^\/project\/[^/]+$/.test(path)
}

/** Страницы без hero-картинки: крошки поверх контента, как на /careers, но с обычным цветом текста. */
export function breadcrumbsOverlayLayout(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/'
  const paths = ['/documents', '/contacts', '/privacy-policy'] as const
  if ((paths as readonly string[]).includes(path)) return true
  return /^\/projects\/direction\/[^/]+$/.test(path)
}

/** На экранах ≤1024px последнюю крошку скрываем — полное название уже в h1 (направления деятельности). */
export function breadcrumbsHideTrailingCurrent(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/'
  return /^\/projects\/direction\/[^/]+$/.test(path)
}

/** Крошки для известных маршрутов; на главной - пусто. */
export function getBreadcrumbEntries(
  pathname: string,
  t: Translate,
  locale: ProjectDetailLocale = 'ru',
): BreadcrumbEntry[] {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/') return []

  const out: BreadcrumbEntry[] = [{ label: t('breadcrumbs.home'), to: '/' }]

  const staticPages: Record<string, string> = {
    '/about-us': 'breadcrumbs.about',
    '/projects': 'breadcrumbs.projects',
    '/careers': 'breadcrumbs.careers',
    '/purchase': 'breadcrumbs.purchase',
    '/documents': 'breadcrumbs.documents',
    '/contacts': 'breadcrumbs.contacts',
    '/privacy-policy': 'breadcrumbs.privacy',
  }

  const labelKey = staticPages[path]
  if (labelKey) {
    out.push({ label: t(labelKey), current: true })
    return out
  }

  const projectMatch = path.match(/^\/project\/([^/]+)$/)
  if (projectMatch) {
    const slug = projectMatch[1]
    out.push({ label: t('breadcrumbs.projects'), to: '/projects' })
    out.push({ label: resolveProjectTitle(slug, locale), current: true })
    return out
  }

  const directionMatch = path.match(/^\/projects\/direction\/([^/]+)$/)
  if (directionMatch) {
    const directionId = directionMatch[1]
    out.push({ label: t('breadcrumbs.projects'), to: '/projects' })
    out.push({
      label: resolveDirectionTitle(directionId, locale as DirectionLocale),
      current: true,
    })
    return out
  }

  return out
}
