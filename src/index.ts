import { Elysia, t } from "elysia";
import { png, svg } from "./avatar";

const cache = "public, max-age=604800, immutable";

const app = new Elysia().get(
  "/:seed",
  ({ params: { seed }, query: { size, rounded, format } }) => {
    if (format === "svg") {
      return new Response(svg(seed, size, rounded), {
        headers: { "content-type": "image/svg+xml", "cache-control": cache },
      });
    }
    return new Response(png(seed, size, rounded), {
      headers: { "content-type": "image/png", "cache-control": cache },
    });
  },
  {
    query: t.Object({
      size: t.Integer({ minimum: 1, maximum: 512, default: 120 }),
      rounded: t.Integer({ default: 0 }),
      format: t.UnionEnum(["png", "svg"], { default: "png" }),
    }),
  },
);

export default app;
