export const officeMapPoint = {
  latitude: 55.695261,
  longitude: 37.347135,
  zoom: 17,
} as const;

function mapLang(locale: "ru" | "en"): string {
  return locale === "en" ? "en_US" : "ru_RU";
}

function mapPointParams(): URLSearchParams {
  const { longitude, latitude, zoom } = officeMapPoint;

  return new URLSearchParams({
    ll: `${longitude},${latitude}`,
    z: String(zoom),
    pt: `${longitude},${latitude},pm2rdm`,
  });
}

export function buildYandexMapEmbedSrc(locale: "ru" | "en"): string {
  const params = mapPointParams();
  params.set("lang", mapLang(locale));

  return `https://yandex.ru/map-widget/v1/?${params.toString()}`;
}

export function buildYandexMapExternalUrl(locale: "ru" | "en"): string {
  const params = mapPointParams();
  params.set("l", "map");
  params.set("lang", mapLang(locale));
  return `https://yandex.ru/maps/?${params.toString()}`;
}
