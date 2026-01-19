# Based on oven/bun official image
FROM oven/bun:1 AS base

WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/ ./packages/
RUN bun install

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY . .

# Ensure all dependencies are present (fallback)
RUN bun install

# Build shared packages first
RUN cd packages/shared && bun run build
RUN cd packages/interface && bun run build

# Build frontend
RUN cd apps/frontend && bun run build

# Production image
FROM nginx:alpine AS runner

# Copy built assets
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

# Copy Nginx configuration if needed (optional, using default for now)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
