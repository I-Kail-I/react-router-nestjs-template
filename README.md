# React Router + NestJS Template

A full-stack TypeScript template organized as a Bun workspace. It combines a server-side-rendered React Router client with a NestJS API and shared code in a separate workspace package.

## Tech stack

- [Bun 1.4](https://bun.sh/) - package manager and JavaScript runtime
- [React Router 8](https://reactrouter.com/) - framework-mode client, SSR enabled
- [React 19](https://react.dev/) - UI components
- [Vite 8](https://vite.dev/) - client development and build tooling
- [Tailwind CSS 4](https://tailwindcss.com/) - utility-first styling
- [NestJS 12](https://nestjs.com/) - HTTP API
- [Rspack](https://rspack.dev/) - NestJS application builder
- [Vitest](https://vitest.dev/) - server unit and end-to-end tests
- [Zod 4](https://zod.dev/) - shared schemas and strict validation
- [Pino](https://getpino.io/) - structured server logging
- [Biome 2](https://biomejs.dev/) - formatting, linting, and source checks
- [Docker Compose](https://docs.docker.com/compose/) - container orchestration

## Project structure

```text
.
├── app/
│   ├── client/          # React Router 8 application
│   │   ├── app/         # Routes, root layout, and UI
│   │   ├── public/      # Static public assets
│   │   └── Dockerfile
│   ├── server/          # NestJS API
│   │   ├── src/         # Controllers, modules, services, and config
│   │   ├── test/        # End-to-end tests
│   │   └── Dockerfile
│   └── shared/          # Code imported by both applications
│       └── src/
│           ├── lib/     # Axios and Zod helpers
│           ├── schema/  # Shared Zod schemas
│           └── utils/   # Shared environment utilities
├── .github/workflows/   # GitHub Actions CI
├── docker-compose.yml
├── package.json         # Workspace scripts
└── bun.lock
```

Workspace packages are:

| Package | Directory | Purpose |
| --- | --- | --- |
| `client` | `app/client` | React Router application on port `3000` |
| `server` | `app/server` | NestJS API on port `8000` |
| `shared` | `app/shared` | Cross-workspace schemas and utilities |

## Requirements

Install Bun 1.4.0 or newer:

```bash
curl -fsSL https://bun.sh/install | bash
```

Docker is optional and only required for the container workflow.

## Installation

From the repository root:

```bash
bun install --frozen-lockfile
```

The frozen lockfile install is also used by CI and the Dockerfiles.

## Environment variables

Copy the examples before running the apps:

```bash
cp app/client/.env.example app/client/.env
cp app/server/.env.example app/server/.env
```

| Variable | Package | Default | Description |
| --- | --- | --- | --- |
| `PORT` | Client | `3000` | React Router development and serve port |
| `PORT` | Server | `8000` | NestJS listening port |
| `NODE_ENV` | Server | unset | Enables production logging behavior when set to `production` |

Environment files are excluded from Git. Never commit secrets or credentials.

## Development

Start both applications together:

```bash
bun run dev
```

Start one application at a time:

```bash
bun run dev:client
bun run dev:server
```

Local URLs:

- Client: `http://localhost:3000`
- API root: `http://localhost:8000/api`

The server applies `/api` as a global route prefix. The current API controller is available at `GET /api`.

## Build

Build the full workspace:

```bash
bun run build
```

Build an individual package:

```bash
bun run build:client
bun run build:server
```

Client output is written to `app/client/build`. Server output is written to `app/server/dist`.

## Run production builds locally

After building:

```bash
bun run start
```

Or start a package separately:

```bash
bun run start:client
bun run start:server
```

## Checks

Run formatting, linting, and source checks across all workspaces:

```bash
bun run check
bun run format:check
bun run lint
```

Apply automated fixes across the workspace:

```bash
bun run fix
bun run format
bun run lint:fix
```

Package-specific commands are also available:

```bash
bun run check:client
bun run check:server
bun run check:shared
bun run format:check:client
bun run lint:server
```

## Tests

Run all available workspace tests:

```bash
bun run test
```

Run or watch server tests directly:

```bash
bun run test:server
bun run --filter server test:watch
bun run --filter server test:e2e
bun run --filter server test:cov
```

The server unit and e2e tests use Vitest. The client and shared workspaces do not currently define test scripts.

## Docker

Build and start both service images:

```bash
docker compose up --build
```

Stop the services:

```bash
docker compose down
```

The Dockerfiles use separate development dependency, builder, production dependency, and runner stages on `oven/bun:1.4-alpine`.

The Compose file currently declares the client and server containers and sets their internal ports, but it does not publish host ports. Add `ports` mappings if you need them reachable from the host, for example:

```yaml
services:
  client:
    ports:
      - "3000:3000"
  server:
    ports:
      - "8000:8000"
```

## CI

GitHub Actions runs a matrix of formatting, linting, source checks, tests, and builds for `client`, `server`, and `shared` on pushes to `main` and pull requests.

It uses Bun `1.4.0`, frozen dependency installation, and Biome or package-specific scripts.

## Shared code

Import shared modules with the `@shared/*` TypeScript path alias:

```ts
import { apiClient } from "@shared/lib/axios/axiosClient.js";
import { exampleSchema } from "@shared/schema/example.dto.js";
import { isProd } from "@shared/utils/env.js";
```

The server uses NestJS Zod validation/serialization pipelines, and Pino provides pretty development logs and JSON-friendly production logging.