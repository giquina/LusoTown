# LusoTown Shared Packages

This folder contains shared code used by both the Next.js web app and the Expo mobile app.

- @lusotown/design-tokens: brand colors, spacing, typography exported as TypeScript constants
- @lusotown/ui: cross-platform React Native components rendered on web via react-native-web

Usage:
- Web (Next.js): imports resolve to source, Next is configured to alias react-native -> react-native-web.
- Mobile (Expo): Metro is configured to watch the monorepo and resolve shared packages.

Change once, reflect everywhere:
- Update a color in `packages/design-tokens/src/index.ts` and both apps pick it up.
- Use `<Button />` from `@lusotown/ui` in both apps for consistent UI.