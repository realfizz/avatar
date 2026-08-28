import { generateDitherAvatar, SIZE } from "dither-avatar";
import { Resvg } from "@resvg/resvg-js";

export function svg(seed: string, size: number, rounded: number) {
  const rx = Math.min(Math.max(rounded, 0), size / 2) * (SIZE / size);
  const face = generateDitherAvatar(seed);
  const open = `<svg width="${size}" height="${size}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">`;
  if (rx === 0) return `${open}${face}</svg>`;
  return `${open}<defs><clipPath id="r"><rect width="${SIZE}" height="${SIZE}" rx="${rx}"/></clipPath></defs><g clip-path="url(#r)">${face}</g></svg>`;
}

export function png(seed: string, size: number, rounded: number) {
  return new Resvg(svg(seed, size, rounded), {
    fitTo: { mode: "width", value: size },
    font: { loadSystemFonts: false },
  })
    .render()
    .asPng();
}
