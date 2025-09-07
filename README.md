# Business CRM Monorepo

## Overview
A full-stack CRM skeleton using Next.js, Express and MongoDB. Managed in a pnpm workspace monorepo.

### Structure
```
apps/
  api/    # Express API
  web/    # Next.js frontend
packages/
  ui/     # Shared UI components
  config/ # Shared TypeScript/ESLint/Prettier configs
```

## Getting Started
1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Environment variables**
   Copy `.env.example` to `.env` and adjust values as needed.
3. **Run in development**
   ```bash
   pnpm dev
   ```
   - Web: http://localhost:3000
   - API: http://localhost:4000

## Docker Compose
```
docker-compose up --build
```
Services:
- **web**: Next.js frontend (port 3000)
- **api**: Express API (port 4000)
- **mongo**: MongoDB database (port 27017)

## Linting
```
pnpm lint
```

## License
MIT
