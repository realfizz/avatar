import { generateDitherAvatar, SIZE } from "dither-avatar";
import { Resvg } from "@resvg/resvg-js";

export type AvatarRequest = {
  seed: string;
  size: number;
  rounded: number;
  format: "png" | "svg";
};

export function avatar({ seed, size, rounded, format }: AvatarRequest) {
  const rx = (Math.min(Math.max(rounded, 0), size / 2) / size) * SIZE;
  const svg = generateDitherAvatar(seed)
    .replace(
      /^<svg[^>]*>/,
      `<svg width="${size}" height="${size}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><defs><clipPath id="r"><rect width="${SIZE}" height="${SIZE}" rx="${rx}"/></clipPath></defs><g clip-path="url(#r)">`,
    )
    .replace(/<\/svg>$/, "</g></svg>");
  if (format === "svg") return { body: svg, type: "image/svg+xml" };
  return {
    body: new Resvg(svg, {
      fitTo: { mode: "width", value: size },
      font: { loadSystemFonts: false },
    })
      .render()
      .asPng(),
    type: "image/png",
  };
}
