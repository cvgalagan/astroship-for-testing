# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React + Vite application for testing Yandex.Metrika WebVisor functionality with configurable timers and form interactions. The project includes Partytown integration (currently commented out) for running analytics in a web worker.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint JavaScript/JSX files
npm run lint
```

## Architecture

### Tech Stack
- **React 18.3** with React Router DOM for client-side routing
- **Redux Toolkit** for state management
- **Vite 5** with SWC plugin for fast builds and HMR
- **Partytown** (dependency present but integration commented out in vite.config.js)

### State Management
Redux store is configured in `src/store/index.js` with a single slice:
- **timers slice** (`src/store/timers/timersSlice.js`): Manages timer-related state including count, increment value, and enabled status

### Routing Structure
Four main routes defined in `src/App.jsx`:
- `/` - HomePage with timer grid controls
- `/forms` - FormsPage for form interactions
- `/window` - WindowPage for window object testing
- `/activity` - ActivityPage for testing user activity with scrollable images, videos, and image galleries

### Component Architecture
- **HomePage**: Controls for adding/removing timers and displays GridPage
- **GridPage**: Renders a grid of InfiniteTimer components based on timersCount prop
- **InfiniteTimer**: Self-contained timer component that increments every second when enabled
- **Navigation**: Navigation menu component
- **FormsPage**: Page for testing form interactions with various input types
- **WindowPage**: Page for testing window object behavior
- **ActivityPage**: Page for testing user activity tracking with scrollable images, video players, and dynamic image galleries
- **ControlButtons**: Shared component for add/remove/toggle controls with optional input field and count display (used in HomePage and ActivityPage)

### Analytics Integration
Yandex.Metrika is embedded directly in `index.html` with WebVisor enabled. The counter ID is `101671390`. Note that `referrer:document.referrer` is explicitly passed in the initialization (see git history for referrer-related changes).

### ESLint Configuration
- Extends recommended React and React Hooks rules
- Disables prop-types and jsx-no-target-blank rules
- Uses react-refresh plugin for HMR validation

## Deployment

Configured for Netlify deployment via `netlify.toml` with SPA redirect handling. CORS headers are commented out in the configuration.
