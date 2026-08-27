# Willovate Store UI

The customer-facing React and TypeScript storefront for Willovate Store. It includes an API-backed catalog, search and category filters, a local persistent shopping bag, responsive states, and a production container.

## Prerequisites

- Node.js 22 (run `nvm use` if you use nvm)
- The sibling `willovate-store-api` running at `http://localhost:5191`

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. If the catalog displays a connection message, start PostgreSQL and the API from the API repository:

```bash
docker compose up -d postgres
dotnet run --project src/Willovate.Store.Api
```

## Validate a change

```bash
npm run lint
npm test
npm run build
```

## Configuration

`VITE_API_URL` is the public base URL of the store API. Vite embeds it at build time, so production builds must receive the deployed API URL.

Build and serve the static application in Docker with:

```bash
docker build --build-arg VITE_API_URL=https://api.example.com -t willovate-store-ui .
docker run --rm -p 5173:8080 willovate-store-ui
```

## Project map

- `src/App.tsx` composes the current storefront experience.
- `src/lib/api.ts` is the typed API boundary.
- `src/lib/cart.ts` contains testable cart behavior.
- `src/hooks/useCart.ts` persists the cart for the browser session.
- `src/types.ts` mirrors the public API contracts used by the UI.

Keep server data behind `src/lib`, keep business calculations pure where possible, and split new routes into feature folders as checkout, customer accounts, and product details are added.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.
