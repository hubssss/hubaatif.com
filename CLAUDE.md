# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
npm run dev        # Start development server on http://localhost:3000
```

### Building
```bash
npm run build      # Build production-ready application
npm run start      # Start production server
```

### Code Quality
```bash
npm run lint       # Run ESLint for code quality checks
```

## High-Level Architecture

This is a **Next.js 13.3** portfolio website using the App Router architecture with TypeScript and Tailwind CSS.

### Core Technologies
- **Next.js 13.3** with experimental App Router (`app/` directory)
- **TypeScript** with strict mode enabled
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Project Structure
- `/app` - Next.js App Router directory containing pages and components
  - `page.tsx` - Main landing page with all sections (Hero, Services, Work, About, FAQ, etc.)
  - `layout.tsx` - Root layout with metadata and font configuration
  - `globals.css` - Global styles and Tailwind imports
  - `/components` - React components
    - `LoadingScreen.tsx` - Animated loading screen component
  - `/api/hello` - Sample API route

### Key Application Features
1. **Single Page Application** - All content in `app/page.tsx` with smooth scroll navigation
2. **Interactive Animations** - Extensive use of Framer Motion for scroll-triggered animations, hover effects, and loading screens
3. **Responsive Design** - Mobile-first approach with responsive breakpoints
4. **Session-based Loading Screen** - Shows loading animation only on first visit using sessionStorage

### Component Architecture
- **Client Components** - Both `page.tsx` and `LoadingScreen.tsx` use `'use client'` directive for interactivity
- **State Management** - Local state with React hooks (useState, useEffect)
- **Animation System** - Framer Motion variants and animations throughout

### Styling Approach
- Tailwind CSS utility classes for all styling
- Custom gradient effects with `bg-clip-text` and `bg-gradient-to-r`
- Neon glow effects using custom CSS classes in `globals.css`
- Dark theme with purple/pink color scheme