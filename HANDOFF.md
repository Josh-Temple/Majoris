# Handoff Notes

## What changed
- Added Progressive Web App (PWA) support for the Vite app.
- Added a web app manifest and monochrome app icons under `public/`.
- Added a service worker for app-shell caching and offline navigation fallback.
- Registered the service worker from `src/main.tsx` via `src/pwa.ts`.
- Updated `index.html` metadata for installability.
- Updated README to document PWA support and secure-context requirements.

## Validation
- Run `npm run build` to verify the production bundle builds successfully.
- After deployment, use Chrome DevTools > Application to confirm the manifest and service worker are active.
- Test offline behavior after one successful load by switching DevTools to Offline and reloading.

## Next session suggestions
- Consider adding a user-facing install prompt or an install help screen.
- Consider versioning the service worker cache name automatically during builds.
- Consider generating PNG icons if a target platform has limited SVG icon support.
