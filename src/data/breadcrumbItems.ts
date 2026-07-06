import {
  resolveDirectionTitle,
  type DirectionLocale,
} from '@/features/projects/direction-detail-locale'
import {
  resolveProjectTitle,
  type ProjectDetailLocale,
} from '@/features/projects/project-detail-locale'

export type BreadcrumbEntry = {
  label: string
  to?: string
  current?: boolean
}

type Translate = (key: string) => string

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

export function breadcrumbsOverlayLayout(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/'
  const paths = ['/documents', '/contacts', '/privacy-policy'] as const
  if ((paths as readonly string[]).includes(path)) return true
  return /^\/projects\/direction\/[^/]+$/.test(path)
}

export function breadcrumbsHideTrailingCurrent(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/'
  return /^\/projects\/direction\/[^/]+$/.test(path)
}

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
