# src/config — API Configuration

Score: 23 (4 files). Distinct domain: dev/production URL routing and axios instance setup for Blogger API.

## OVERVIEW
Configuration is split into three files: `url.js` holds environment-conditional base URLs, `config.js` creates the shared axios instance, `index.js` re-exports both.

## STRUCTURE
```
config/
├── api/
│   ├── url.js      # dev vs production URLs; Google API key, blogId, Disqus, AddThis, CSE
│   ├── config.js   # axios.create() with timeout=10000, ApiRequest class with HTTP verb factories
│   └── index.js    # exports API object (blogPost, blogSummary, blogPostFeed, blogPage)
└── index.js        # re-exports { API }
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Change API base URL | `api/url.js` development or production block |
| Change timeout | `api/config.js` axios.create({ timeout: ... }) |
| Add new API endpoint | Add to `baseUrl` in `url.js`, add method in `api/index.js` |
| Change blog ID | Set `window.__BLOG_ID__` in `public/index.html` or edit default in `utils/index.js` |

## CONVENTIONS
- `isLocalhost` (from `utils`) determines dev vs production config — no `.env` files used
- `ApiRequest` class uses static methods returning curried functions: `API.blogPost = ApiRequest.get(route)`
- Google API key is hardcoded in source — acceptable for read-only public blog data

## ANTI-PATTERNS
- Never add `process.env` references — CRA without dotenv; use `window.__VARIABLE__` injections from HTML instead
- Never create a second axios instance — all requests go through `apiInstance`
