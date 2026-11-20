FROM oven/bun:1.4-alpine AS development-dependencies
WORKDIR /app
COPY package.json bun.lock ./
COPY app/client ./app/client
COPY app/shared ./app/shared
RUN bun install --frozen-lockfile --filter client --filter shared

FROM oven/bun:1.4-alpine AS builder-stage
WORKDIR /app
COPY --from=development-dependencies /app ./
RUN bun run --filter client build

FROM oven/bun:1.4-alpine AS production-dependencies
WORKDIR /app
COPY --from=builder-stage /app ./
RUN bun install --frozen-lockfile --production --filter client --filter shared

FROM oven/bun:1.4-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=production-dependencies /app ./
CMD ["bun", "run", "--filter", "client", "start"]