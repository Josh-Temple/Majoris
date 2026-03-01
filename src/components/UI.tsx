import React from 'react';
import { motion } from 'motion/react';

/**
 * @file UI.tsx
 * @description The Single Source of Truth for Majoris UI components.
 * AI ASSISTANTS: You MUST use these components for all UI elements. 
 * Do NOT create raw HTML tags (div, h1, button) with generic Tailwind classes 
 * if one of these components fits the use case.
 */

/**
 * Main wrapper for page content. Provides consistent padding and flex layout.
 */
export const Container = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`flex-1 flex flex-col p-8 ${className}`}>
    {children}
  </div>
);

/**
 * Typography system. Relies on tracking (letter-spacing) and weight for hierarchy.
 */
export const Typography = {
  H1: ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h1 className={`text-6xl font-light tracking-tighter ${className}`}>{children}</h1>
  ),
  H2: ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h2 className={`text-4xl font-light tracking-tighter ${className}`}>{children}</h2>
  ),
  /** Used for small, uppercase, widely-tracked labels (e.g., "QUESTION", "ANSWER") */
  Label: ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600 ${className}`}>{children}</div>
  ),
  /** Used exclusively for numbers, scores, and technical data */
  Mono: ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`font-mono ${className}`}>{children}</span>
  )
};

/**
 * Minimalist icon button. Used for navigation and actions.
 */
export const IconButton = ({ onClick, children, className = "" }: { onClick: () => void, children: React.ReactNode, className?: string }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center space-x-2 text-[10px] uppercase tracking-widest transition-colors hover:text-current ${className}`}
  >
    {children}
  </button>
);

/**
 * Used for lists, settings rows, and data display.
 */
export const ListItem = ({ label, sublabel, children, className = "" }: { label: string, sublabel?: string, children: React.ReactNode, className?: string }) => (
  <div className={`flex flex-col border-b border-zinc-100 dark:border-zinc-900 pb-2 ${className}`}>
    <div className="flex flex-col mb-1">
      <span className="text-sm font-medium">{label}</span>
      {sublabel && <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">{sublabel}</span>}
    </div>
    {children}
  </div>
);

/**
 * Mandatory wrapper for all top-level screen components to ensure smooth transitions.
 */
export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="flex-1 flex flex-col h-full"
  >
    {children}
  </motion.div>
);

