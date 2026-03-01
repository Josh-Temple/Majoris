# Majoris - AI Coding Guidelines & Design System

**To the AI Assistant (Codex, ChatGPT, Claude, etc.):**
If you are tasked with modifying or extending this codebase, you **MUST** strictly adhere to the following design and architectural rules. Failure to do so will break the application's core aesthetic.

## 1. Core Philosophy: Extreme Minimalism ("引き算の美学")
- The UI is stoic, professional, and highly minimal.
- **DO NOT** add unnecessary borders, drop shadows (`shadow-md`, etc.), or rounded corners (`rounded-xl`) unless explicitly requested.
- **DO NOT** use colorful gradients, generic "modern UI" trends, or default blue/purple buttons.

## 2. Color Palette
- **Monochrome Base**: Pure black (`bg-black`, `text-black`) and pure white (`bg-white`, `text-white`).
- **Grays**: Use ONLY the `zinc` scale (`zinc-100` to `zinc-900`) for secondary elements, borders, and muted text. Do not use `gray`, `slate`, or `neutral`.
- **Semantic Colors**: Use extremely sparingly. `red-400` for mistakes/warnings, `emerald-400` for success/easy.
- **Dark Mode**: The app fully supports dark mode via the `.dark` class on the wrapper. Always use `dark:` variants for colors to ensure contrast in both modes (e.g., `text-zinc-400 dark:text-zinc-600`).

## 3. Typography
- **Sans-serif**: `Inter` (default for UI).
- **Monospace**: `JetBrains Mono` (used exclusively for numbers, scores, and technical data).
- **Hierarchy**: Create visual hierarchy using tracking (letter spacing) and weight, not just size.
  - Large headings: `font-light tracking-tighter`
  - Small labels: `text-[10px] uppercase tracking-widest`

## 4. The "Single Source of Truth" for UI Components
When building or modifying screens, you **MUST** use the components exported from `src/components/UI.tsx`.
- `<Container>`: For main page layouts.
- `<Typography.H1>`, `<Typography.H2>`: For page titles.
- `<Typography.Label>`: For small, uppercase tracking labels.
- `<Typography.Mono>`: For numbers and data.
- `<IconButton>`: For clickable actions with icons.
- `<ListItem>`: For settings and list rows.
- `<PageTransition>`: Wrap all main screens in this for smooth `motion/react` transitions.

**DO NOT** write raw HTML tags (e.g., `<h1 className="...">` or `<div className="text-[10px]...">`) if a `Typography` component exists for it.

## 5. Tech Stack Specifics
- **Tailwind CSS v4**: Configuration is done via `@theme` in `src/index.css`. There is NO `tailwind.config.js`. Do not try to create one.
- **Animations**: Use `motion/react` (`<motion.div>`).
- **Icons**: Use `lucide-react`.
