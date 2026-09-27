# src/utils — Browser and Data Utilities

Score: 15 (2 files). Distinct domain: DOM helpers, Blogger feed response parsing, image URL manipulation.

## OVERVIEW
Pure utility functions with no React dependency except implicit `window`/`document` access. Two entry points: `index.js` (functions) and `featuredPost.json` (dummy data for local dev).

## STRUCTURE
```
utils/
├── index.js            # blogId, elementId, isLocalhost, resizeImage, mapFeedToFeatureData, createAuthor, etc.
└── featuredPost.json   # hardcoded featured post for localhost fallback
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Change default blog ID | `index.js` default value in `blogId` constant |
| Change image resize dims | `resizeImage()` default width/height params |
| Update dummy featured post | `featuredPost.json` |
| Add new helper | Append to `index.js`, export, import via `utils/` alias |

## CONVENTIONS
- All exports are named functions or constants — no default export except `dummyFeaturePost`
- `elementId()` is the bridge between React and Blogger HTML: `document.getElementById(name)`
- `resizeImage()` uses regex to swap Blogger's `/sXXX-c` URL param for `/w{w}-h{h}-{c}`

## ANTI-PATTERNS
- Never import React here — utils must remain framework-agnostic
- Never add network requests — services layer owns all HTTP
- `parseJSON()` wraps `JSON.parse` with try/catch but re-throws — consider whether the catch adds value
