# Avatar

Deterministic dithered avatars from a seed.

## Usage

```
GET /:seed
```

Each seed produces the same avatar every time. The service does not interpret the seed.

PNG at 120px:

```
GET /alice
```

### Query

| Query | Default | Meaning |
| --- | --- | --- |
| `size` | `120` | Output pixels. 1 to 512. |
| `rounded` | `0` | Corner radius in pixels. `0` is square. Half of `size` or more is a circle. |
| `format` | `png` | `png` or `svg`. Query param, not a file extension. |

`GET /next.js?format=svg` is an avatar for the seed `next.js`.

`GET /` with no seed is 404.

Responses cache with `public, max-age=604800, immutable`.

## Local

```bash
bun run dev
```
