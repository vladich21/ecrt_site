/** Импорт PNG из webpack/next может быть строкой или объектом с полем `src`. */
export function imageSrc(asset: string | { src: string }): string {
  return typeof asset === "string" ? asset : asset.src;
}
