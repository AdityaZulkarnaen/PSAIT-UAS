# syntax=docker/dockerfile:1

# ----------------------------------------------------------------------------
# Dockerfile multi-stage untuk Next.js (output: "standalone")
# Menghasilkan image produksi yang ramping — hanya berisi runtime yang dibutuhkan.
# ----------------------------------------------------------------------------

FROM node:22-alpine AS base

# --- 1. Install dependency ---------------------------------------------------
FROM base AS deps
# libc6-compat kadang dibutuhkan paket native di Alpine.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install hanya dari lockfile agar reproducible.
COPY package.json package-lock.json ./
RUN npm ci

# --- 2. Build aplikasi -------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Base URL API bersifat NEXT_PUBLIC_* sehingga di-inline saat build.
# Override saat build bila perlu: --build-arg NEXT_PUBLIC_API_BASE_URL=...
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- 3. Runner (image akhir) -------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Jalankan sebagai user non-root.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Aset publik dan output standalone.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# server.js dihasilkan oleh output standalone Next.js.
CMD ["node", "server.js"]
