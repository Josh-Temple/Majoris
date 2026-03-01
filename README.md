# Majoris

A minimalist, mobile-first web application for training the Major System (a mnemonic technique used to memorize numbers by converting them into consonant sounds, then into words).

## Features
- **Session & Endless Modes**: Train your memory with customizable session lengths.
- **Mastery Tracking**: Visual statistics of your learning progress.
- **Extreme Minimalism**: A distraction-free, typography-focused UI ("引き算の美学").
- **Dark Mode**: Full support for light and dark themes.
- **Local First**: All data is stored securely in your browser's `localStorage`.
- **Import/Export**: Backup and restore your custom peg lists and progress.

## Tech Stack
- React 18+
- Vite
- Tailwind CSS v4
- Framer Motion (`motion/react`)
- Lucide React (Icons)

## 🤖 AI Handoff Instructions (For Codex, ChatGPT, Claude, Cursor)

If you are passing this repository to an AI coding assistant, **you MUST provide the AI with the `DESIGN_GUIDELINES.md` file first.**

**Prompt to copy-paste to the AI:**
> "I want you to modify this codebase. Before you write any code, please read `DESIGN_GUIDELINES.md` carefully. You must strictly follow its rules regarding extreme minimalism, typography, and the mandatory use of `src/components/UI.tsx`. Do not introduce generic UI patterns."

This ensures the AI maintains the strict, stoic, and highly crafted aesthetic of the application without degrading it with default Tailwind components.
