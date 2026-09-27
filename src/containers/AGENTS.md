# src/containers — Page-Level Mount Shims

Score: 49 (8 JS files, 7 subdirs). Distinct domain: each container is a 10-line wrapper that renders one organism inside a `<Section>` and mounts to a unique DOM element ID.

## OVERVIEW
Containers do not hold state or logic. They exist solely to connect an organism component to a DOM node registered in `src/elements/index.js`, then render via `ReactDOM.render()` in `src/index.js`.

## STRUCTURE
```
containers/
├── FeaturePost/         # → #HomeFeaturedPost
├── PostContainer/       # → #HomePostContainer
├── SidebarPopularPost/  # → #singlePopularPost
├── SinglePost/          # (unused — commented out in index.html)
├── SinglePostContainer/ # → #SinglePostContainer
├── FooterSocialIcon/    # → #FooterSocialContainer
└── GoogleSearchContainer/# → #SearchPostContainer
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Add new page view | New dir here + add to `containers/index.js` + `src/index.js` registerComponent |
| Change mount element ID | `src/elements/index.js` (not here) |
| Wrap organism differently | Edit the container's render method |

## CONVENTIONS
- Containers are either FC or thin class wrapping one organism
- No props passed through — each organism reads data from services/utils directly
- `SinglePost` (non-Container) exists but is not mounted; likely legacy

## ANTI-PATTERNS
- Do not add state or API calls to containers — that belongs in the organism
- Do not import containers into other components — they are only referenced from `src/index.js`
