import logoRzd from '../assets/logos/rzd-logo.svg'
import logoEcosystemMark from '../assets/logos/logo-ecosystem-mark.svg'
import logoSinara from '../assets/logos/stm_logo_rgb_9.webp'

export type FooterPartnerLogo = {
  id: string
  src: string
  alt: string
  href: string
}

export const footerPartnerLogos: FooterPartnerLogo[] = [
  {
    id: 'rzd',
    src: logoRzd,
    alt: 'ОАО «Российские железные дороги»',
    href: 'https://company.rzd.ru/',
  },
  {
    id: 'ecosystem',
    src: logoEcosystemMark,
    alt: 'Партнер экосистемы проектов',
    href: 'https://ecrt.ru/',
  },
  {
    id: 'sinara',
    src: logoSinara,
    alt: 'Группа Синара',
    href: 'https://www.sinara.ru/',
  },
]
