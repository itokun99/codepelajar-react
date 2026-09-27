# src/assets/scss — Stylesheet Architecture

Score: 71 (20 SCSS files). Distinct domain: layered BEM architecture mirroring the component hierarchy.

## OVERVIEW
SCSS organized in four layers matching component granularity. Global variables and resets at bottom of import tree; layer index files cascade imports upward.

## STRUCTURE
```
scss/
├── global/
│   ├── _variable.scss   # $color-* , $font-* , $breakpoint-* tokens
│   └── _reset.scss      # Normalize-lite: box-sizing, margin reset
├── components/
│   ├── atoms/           # .a-button, .a-text, .a-skeleton ...
│   ├── molecules/       # .m-post-card, .m-post-list, .m-bread-crumb ...
│   └── organisms/       # .o-feature-block, .o-post-block, .o-popular-post ...
│   └── index.scss       # imports atoms/, molecules/, organisms/
└── containers/
    └── _sidebar.scss    # .c-sidebar layout overrides
    └── index.scss       # imports containers/
└── index.scss           # imports global → components → containers
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Change brand color | `global/_variable.scss` |
| Fix button appearance | `components/atoms/_button.scss` |
| Adjust post card layout | `components/molecules/_post-card.scss` |
| Change featured section padding | `components/organisms/_feature-block.scss` |
| Add new component styles | New file in matching layer; add to layer `index.scss` |

## CONVENTIONS
- BEM naming: `.a-{name}`, `.m-{name}`, `.o-{name}`, `.c-{name}`
- Layer index files use `@import` — never import a leaf directly from `index.scss`
- No nested selectors beyond 3 levels deep
-SCSS variables in `_variable.scss` are the single source of truth for colors/sizes

## ANTI-PATTERNS
- Never write raw CSS — all styles in SCSS
- Never override with `!important` — adjust selector specificity instead
- Never add component styles outside the component's layer directory
