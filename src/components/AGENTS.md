# src/components — Presentation Layer

Score: 102 (27 JS files, 3 subdir levels, high symbol density). Distinct domain: pure presentational components following strict atom→molecule→organism hierarchy.

## OVERVIEW
Composable UI components organized by granularity. Atoms are framework-agnostic primitives; molecules compose atoms; organisms compose molecules/atoms and may hold local state.

## STRUCTURE
```
components/
├── atoms/          # Irreducible: Button, Text, View, Image, Anchor, Icon, Skeleton, Section, Container
├── molecules/      # Composed: PostCard, PostList, PostAuthorMeta, PostLabel, BreadCrumb, DisqusComment, AddThis
└── organisms/      # Page sections: FeatureBlock, PostBlock, PopularPost, SinglePostBlock, FooterSocialBlock, GoogleSearch
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| Change button styles | `atoms/Button/` + `assets/scss/components/atoms/Button.scss` |
| Add new molecule | Create dir in `molecules/`, export from `molecules/index.js` |
| Add new organism | Create dir in `organisms/`, export from `organisms/index.js` |
| Fix layout padding | `atoms/Section/` or `atoms/Container/` |

## CONVENTIONS
- Each component in its own `index.js` — no multi-component files
- Atoms never import from molecules or organisms
- Molecules import atoms via `components/atoms` alias, other molecules via relative path
- Organisms may import from `services/` and `utils/` (only level allowed to call API)
- All components use class-based React (`React.Component` or `React.PureComponent`); no hooks

## ANTI-PATTERNS
- Never put business logic in atoms or molecules
- Never import containers from within components
- Never use `useState`/`useEffect` — this project predates hooks; use class lifecycle
