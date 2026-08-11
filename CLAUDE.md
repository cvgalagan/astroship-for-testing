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
Redux store is configured in `src/store/index.js` with two slices:
- **timers slice** (`src/store/timers/timersSlice.js`): Manages timer-related state including count, increment value, and enabled status
- **shop slice** (`src/store/shop/shopSlice.js`): Cart, orders, loyalty, contact verification, label variant and markup coverage. Persisted to `localStorage` under `shop-state-v1` via a `store.subscribe` handler

### Routing Structure
Routes defined in `src/App.jsx`:
- `/` - HomePage with timer grid controls
- `/forms` - FormsPage for form interactions
- `/window` - WindowPage for window object testing
- `/activity` - ActivityPage for testing user activity with scrollable images, videos, and image galleries
- `/shop/*` - test e-commerce shop (nested routes under `ShopLayout`): `/shop` gallery, `/shop/product/:productId`, `/shop/cart`, `/shop/checkout`, `/shop/payment`, `/shop/orders`, `/shop/orders/:orderId`, `/shop/coverage`

### Component Architecture
- **HomePage**: Controls for adding/removing timers and displays GridPage
- **GridPage**: Renders a grid of InfiniteTimer components based on timersCount prop
- **InfiniteTimer**: Self-contained timer component that increments every second when enabled
- **Navigation**: Navigation menu component
- **FormsPage**: Page for testing form interactions with various input types
- **WindowPage**: Page for testing window object behavior
- **ActivityPage**: Page for testing user activity tracking with scrollable images, video players, and dynamic image galleries
- **ControlButtons**: Shared component for add/remove/toggle controls with optional input field and count display (used in HomePage and ActivityPage)

### Test Shop (`/shop`)
A fake storefront with no backend, built to exercise every `screen_type` × `action_type` pair of the button-markup specification (all screen types except `other`, all primary action types, no dynamic labels).

- **Taxonomy** (`src/shop/taxonomy.js`): `SCREEN` / `ACTION` constants and `COVERAGE_MATRIX` — the list of required pairs (31 total) with hints. `/shop/coverage` renders it as a checklist that fills in as buttons are clicked.
- **Labels** (`src/shop/labels.js`): button texts per variant. Variant A uses unambiguous wording, variant B deliberately reuses the same text for different actions ("Оформить заказ" on both cart and checkout). Switched in the shop header, also accepts `?variant=b`.
- **ActionButton** (`src/components/ShopPage/ActionButton.jsx`): the only place that stamps `data-screen-type` / `data-action-type` / `data-slot`, marks coverage and fires analytics. Every target button goes through it.
- **Traps**: checkout's main button is labelled «Отправить заявку» but marked `PLACE_ORDER`; the cart's "Оформить в одном окне" opens a modal with the full checkout form, which stays `checkout` rather than `popup`.
- **Debug HUD**: `?debug=1` shows the expected `screen_type`, the expected actions for it, and everything currently marked in the DOM.
- **Catalog** (`src/shop/catalog.js`) is static, images come from picsum.photos. Orders are created in the browser: checkout/quick order → `awaiting_payment` → payment or `PAY_CREATED_ORDER` from order details.

### Analytics Integration
Yandex.Metrika is embedded directly in `index.html` with WebVisor enabled. Shop actions additionally push to `dataLayer` and call `ym(..., 'reachGoal', '<screen>__<action>')` plus ecommerce containers (`src/shop/analytics.js`). The counter ID is `101671390`. Note that `referrer:document.referrer` is explicitly passed in the initialization (see git history for referrer-related changes).

### ESLint Configuration
- Extends recommended React and React Hooks rules
- Disables prop-types and jsx-no-target-blank rules
- Uses react-refresh plugin for HMR validation

## Deployment

Configured for Netlify deployment via `netlify.toml` with SPA redirect handling. CORS headers are commented out in the configuration.
