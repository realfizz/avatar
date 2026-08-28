import { Elysia, t } from "elysia";
import { avatar } from "./avatar";

const app = new Elysia().get(
  "/:seed",
  ({ params: { seed }, query: { size, rounded, format } }) => {
    const { body, type } = avatar({ seed, size, rounded, format });
    return new Response(body, {
      headers: {
        "content-type": type,
        "cache-control": "public, max-age=604800, immutable",
      },
    });
  },
  {
    params: t.Object({ seed: t.String() }),
    query: t.Object({
      size: t.Integer({ minimum: 1, maximum: 512, default: 120 }),
      rounded: t.Integer({ default: 0 }),
      format: t.UnionEnum(["png", "svg"], { default: "png" }),
    }),
  },
);

export default app;

if (import.meta.main) {
  app.listen(3000);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}
