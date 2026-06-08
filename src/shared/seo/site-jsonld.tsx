import { getPublicSiteOrigin } from "./build-page-metadata";

type SiteJsonLdProps = {
  locale?: "ru" | "en";
};

export function SiteJsonLd({ locale = "ru" }: SiteJsonLdProps) {
  const baseUrl = getPublicSiteOrigin();
  const isEn = locale === "en";

  const organizationName = isEn
    ? "Engineering center of railway transport"
    : "АО «Инжиниринговый центр железнодорожного транспорта»";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: organizationName,
        alternateName: isEn ? "ECRT" : "АО ИЦ ЖТ",
        url: baseUrl,
        email: "info@ecrt.ru",
        telephone: "+7 (495) 909-17-99",
        address: {
          "@type": "PostalAddress",
          postalCode: "121205",
          addressLocality: isEn ? "Moscow" : "Москва",
          streetAddress: "Territory of Skolkovo Innovation Center, Bolshoy Blvd, 40",
          addressCountry: "RU",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: isEn ? `${baseUrl}/en` : baseUrl,
        name: isEn ? "ECRT" : "АО ИЦ ЖТ",
        inLanguage: isEn ? "en" : "ru",
        publisher: { "@id": `${baseUrl}/#organization` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
