# PROJECT KNOWLEDGE BASE

**Generated:** 2026-09-27
**Commit:** {SHORT_SHA}
**Branch:** {BRANCH}

## OVERVIEW
React 16 CSR template that injects views into Blogger XML templates via `ReactDOM.render()` into named `<div id>` slots. Fetches Blogger API data client-side; no React Router.

## STRUCTURE
```
codepelajar-react/
├── src/
│   ├── assets/scss/        # BEM SCSS: atoms/molecules/organisms/containers layers
│   ├── components/         # Presentational (atoms → molecules → organisms)
│   ├── containers/         # Page-level shims: render component into DOM element
│   ├── config/api/         # Blogger API base URLs + axios factory
│   ├── services/           # API call functions (callPosts, callFeaturedPost, etc.)
│   ├── libraries/          # Re-export bundle: React, lodash, moment, axios, react-icons
│   └── utils/              # DOM helpers, image resize, feed parsing
└── public/
    └── index.html          # Blogger template with __BLOG_ID__, __POSTS__, __POPULAR_POST__ injected
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add new page component | `src/containers/` + `src/components/organisms/` | Container shims DOM mount; organism holds logic |
| Add UI primitive | `src/components/atoms/` | Export from `src/components/atoms/index.js` |
| Change API endpoint | `src/config/api/url.js` | dev/production split via `isLocalhost` |
| Fix feed parsing | `src/utils/index.js` | `mapFeedToFeatureData`, `createAuthor` |
| Adjust theme colors | `src/assets/scss/global/variable.scss` | SCSS variables |

## CODE MAP
| Symbol | Type | Location | Refs | Role |
|--------|------|----------|------|------|
| `registerComponent` | const | `src/index.js` | 6 | Maps containers to DOM element IDs |
| `elements` | object | `src/elements/index.js` | 6 | ID registry: HOME_FEATURED_POST, SINGLEPOST, etc. |
| `API` | object | `src/config/api/index.js` | services | Blog post/summary/page fetchers |
| `apiInstance` | axios | `src/config/api/config.js` | API | Singleton axios with timeout=10000 |
| `callPosts` | async fn | `src/services/index.js` | PostBlock | Paginated post list fetcher |
| `callFeaturedPost` | async fn | `src/services/index.js` | FeatureBlock | Single featured post fetcher |
| `getPopularPostData` | async fn | `src/services/index.js` | PopularPost | Reads `window.__POPULAR_POST__` from HTML |
| `blogId` | const | `src/utils/index.js` | url.js | Reads `window.__BLOG_ID__` or default |
| `resizeImage` | fn | `src/utils/index.js` | atoms/Image | Replaces Blogger `/sXXX-c` URL params |

## CONVENTIONS
- **BEM SCSS**: `a-` (atom), `m-` (molecule), `o-` (organism), `c-` (container) prefix
- **Component pattern**: Container wraps Organism in `<Section>`; Organism has state + API calls; Molecule/Atom are pure
- **JSX comments**: `// eslint-disable-next-line react/no-did-update-set-state` permitted in containers only
- **Import aliases**: `jsconfig.json` paths → `components/`, `containers/`, `services/`, `utils/`, `config/`, `libraries/`
- **Dummy data**: `src/utils/featuredPost.json` used as fallback when `isLocalhost` is true
- **PropTypes required**: All components declare propTypes; `navigation` and `screenProps` exempted

## ANTI-PATTERNS (THIS PROJECT)
- NO React Router — routing is handled by Blogger server-side; different `index.html` for single-post view
- NO TypeScript — uses PropTypes exclusively
- NO CSS-in-JS — all styles in SCSS; inline `style={{}}` only for dynamic values (skeleton sizing)
- NO state management library — each container manages its own state
- `setTimeout` with hardcoded delays (2000–3000ms) in `componentDidMount` for skeleton UX — fragile

## UNIQUE STYLES
- Components imported from moniker paths: `import { Button } from 'components/atoms'` (not relative)
- Libraries re-exported as named binds: `import { React, PropTypes, cx, moment, axios } from 'libraries'`
- HTML `<script>` tags inject `window.__POSTS__`, `window.__POPULAR_POST__`, `window.__CODEPELAJAR_CONFIG__` from Blogger template

## COMMANDS
```bash
yarn install
yarn start        # dev server on port 3000
yarn build        # production build to dist/
yarn test         # jest --watch
```

## NOTES
- `public/index.html` is the Blogger template — editing it requires re-deploying to Blogger
- The `template.xml` file at root is the full Blogger template; `public/index.html` is a CRA dev copy
- To add a new widget area, add a `<div id="...">` in `index.html` and a corresponding entry in `src/elements/index.js` + `src/index.js` registerComponent array
- `src/serviceWorker.js` is CRA-default; unregister() is called in `src/index.js`
- Blogger API key is exposed in source (`url.js`) — acceptable for read-only public blog data
