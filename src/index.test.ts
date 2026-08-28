import { describe, expect, test } from "bun:test";
import app from "./index";

const handle = (path: string) =>
  app.handle(new Request(`http://localhost${path}`));

const pngWidth = (bytes: Uint8Array) =>
  new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(16);

describe("GET /:seed", () => {
  test("GET / is 404", async () => {
    const res = await handle("/");
    expect(res.status).toBe(404);
  });

  test("PNG 120 default", async () => {
    const res = await handle("/alice");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/png");
    expect(res.headers.get("cache-control")).toBe(
      "public, max-age=604800, immutable",
    );
    const bytes = new Uint8Array(await res.arrayBuffer());
    expect(bytes[0]).toBe(0x89);
    expect(bytes[1]).toBe(0x50);
    expect(bytes[2]).toBe(0x4e);
    expect(bytes[3]).toBe(0x47);
    expect(pngWidth(bytes)).toBe(120);
  });

  test("format=svg", async () => {
    const res = await handle("/alice?format=svg");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/svg+xml");
    const svg = await res.text();
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('width="120"');
    expect(svg).toContain('height="120"');
  });

  test("size", async () => {
    const res = await handle("/alice?size=32");
    expect(res.status).toBe(200);
    const bytes = new Uint8Array(await res.arrayBuffer());
    expect(pngWidth(bytes)).toBe(32);
  });

  test("rounded", async () => {
    const square = await handle("/alice?format=svg");
    const circle = await handle("/alice?format=svg&rounded=60");
    const clamped = await handle("/alice?format=svg&rounded=999");
    expect(await square.text()).not.toContain("clipPath");
    expect(await circle.text()).toContain('rx="100"');
    expect(await clamped.text()).toContain('rx="100"');
  });

  test("next.js seed kept whole", async () => {
    const res = await handle("/next.js?format=svg");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/svg+xml");
    const svg = await res.text();
    expect(svg.startsWith("<svg")).toBe(true);
    const other = await handle("/next?format=svg");
    expect(svg).not.toBe(await other.text());
  });
});
