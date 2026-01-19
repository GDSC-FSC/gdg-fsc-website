# Based on oven/bun official image
FROM oven/bun:1 AS base

WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/ ./packages/
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY . .

# Build shared packages first
RUN cd packages/shared && bun run build

# Build frontend
RUN cd apps/frontend && bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built assets and necessary files
COPY --from=builder /app/apps/frontend/dist ./apps/frontend/dist
COPY --from=builder /app/apps/frontend/server.ts ./apps/frontend/server.ts
COPY --from=builder /app/apps/frontend/src ./apps/frontend/src
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/node_modules ./apps/frontend/node_modules

EXPOSE 3000

CMD ["bun", "run", "apps/frontend/server.ts"]