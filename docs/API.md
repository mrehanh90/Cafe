# API Reference

Base URL (local): `http://localhost:3000`

All responses are JSON. There's no authentication — this is a small demo backend, not a public API meant for outside consumers.

---

## `GET /health`

Simple liveness check, useful for uptime monitors or a host's health check config.

**Response**
```json
{ "status": "ok", "uptime": 42.13 }
```

---

## `GET /api/cafes`

Returns the cafe list, optionally filtered and sorted.

**Query params** (all optional)

| Param | Values | Default | Notes |
|---|---|---|---|
| `query` | any string | `""` | Matches against name, address, and description (case-insensitive) |
| `feature` | `all`, `wifi`, `bakery`, or any tag in the dataset | `all` | Exact match against a cafe's `features` array |
| `sort` | `default`, `rating`, `name` | `default` | `rating` sorts highest first, `name` sorts A–Z |

**Example**
```
GET /api/cafes?query=coffee&feature=wifi&sort=rating
```

**Response** — array of cafe objects:
```json
[
  {
    "id": 1,
    "name": "Brew",
    "address": "Block 4F, Shaheen Market, E-7, Islamabad, 44000, Pakistan",
    "lat": 33.727251,
    "lng": 73.047777,
    "features": ["wifi", "quiet", "bakery"],
    "rating": "⭐ 4.2",
    "description": "..."
  }
]
```

---

## `GET /api/cafes/near`

Returns all cafes sorted by distance from a given coordinate (nearest first). Cafes with missing coordinates are excluded.

**Query params** (required)

| Param | Type | Notes |
|---|---|---|
| `lat` | float | User's latitude |
| `lng` | float | User's longitude |

**Example**
```
GET /api/cafes/near?lat=33.7180&lng=73.0551
```

**Errors**
- `400` — missing `lat` or `lng`

---

## `POST /api/ai-search`

Takes a free-text description and asks Gemini to return the best-matching cafe ids. Rate-limited to 10 requests/minute per IP, and results are cached in-memory for 10 minutes per unique query to conserve quota.

**Body**
```json
{ "query": "quiet place with wifi near F-7" }
```

**Response** — array of cafe objects, same shape as `/api/cafes`, ordered by relevance as judged by the model.

**Errors**
- `400` — missing `query`
- `429` — rate limit hit, try again shortly
- `500` — server missing `GEMINI_API_KEY`
- `502` — Gemini request failed or returned an error

---

## Notes for future changes

- The dataset lives in `data/cafes.json`. If it moves to a real database, only `server.js`'s `loadCafes()` function needs to change — the routes and response shapes should stay the same to avoid breaking the frontend.
- `feature` filtering is an exact tag match, not full-text search within features — if you add fuzzy matching, document it here.
