# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Install dependencies (run from root)
npm install

# Run both frontend and backend in development mode
npm run dev

# Run only frontend
cd frontend && npm run dev

# Run only backend
cd backend && npm run dev
```

### Building
```bash
# Build both frontend and backend
npm run build

# Build only frontend
cd frontend && npm run build

# Build only backend
cd backend && npm run build
```

### Type Checking & Linting
```bash
# Frontend type checking
cd frontend && npm run check

# Frontend linting
cd frontend && npm run lint
```

## Architecture Overview

Ghetti is a chord diagram application using a monorepo structure with TypeScript throughout:

### Frontend (SvelteKit)
- **Routes**: Pages are in `frontend/src/routes/`
  - `/` - Home page
  - `/chord-creator` - Interactive chord creation interface
  - `/song-viewer` - Song viewing interface
- **API Client**: Functions in `frontend/src/lib/api/chords.ts` handle backend communication
- **Shared Types**: Imports Zod schemas from backend via `$lib/schemas`

### Backend (Express + SQLite)
- **Entry Point**: `backend/src/server.ts` 
- **Database**: SQLite with Drizzle ORM, schema in `backend/src/db/schema.ts`
- **API Routes**: RESTful endpoints in `backend/src/routes/`
- **Validation**: Zod schemas in `backend/src/schemas/index.ts` are the source of truth for data models

### Key Patterns
1. **Type Safety**: Zod schemas defined in backend are imported by frontend for validation
2. **API Communication**: Frontend uses fetch to communicate with backend on port 3001
3. **Database Operations**: Use Drizzle ORM for all database interactions
4. **Component Structure**: Svelte 5 components with TypeScript

### Data Models
- **Chord**: `{ id?, name, fingering: number[], frets, notes: string[] }`
- **Song**: `{ id?, title, chordIds: number[], structure, lyrics? }`

### Current Implementation
- Backend chord CRUD operations are complete
- Frontend chord creator UI exists but needs backend integration
- Song endpoints are not yet implemented
- No authentication system in place