FROM node:20.11.1-alpine3.19 AS base

# Installing turbo globally
RUN npm install turbo --global

FROM base AS builder
RUN echo "Builder Stage"
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
COPY .  .
RUN turbo prune frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN echo "Installer Stage"
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json .
RUN npm install

# Build the project
COPY --from=builder /app/out/full .
RUN turbo build --filter=frontend

FROM base AS runner
RUN echo "Runner Stage"
WORKDIR /app

# Creating a group and non-root user
RUN addgroup --system --gid 1001 frontend
RUN adduser --system --uid 1001 frontend
USER frontend

# COPY --from=installer /app .
COPY --from=installer --chown=frontend:frontend /app .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# RUN if [ -d "/app/apps/frontend/.next/standalone" ]; then \
#   COPY --from=installer --chown=frontend:frontend /app/apps/frontend/.next/standalone ./; \
# fi
# COPY --from=installer --chown=frontend:frontend /app/apps/frontend/.next/static ./apps/frontend/.next/static
# COPY --from=installer --chown=frontend:frontend /app/apps/frontend/public ./apps/frontend/public

EXPOSE 3000

CMD ["sh", "-c", "cd /app/apps/frontend && npm run dev"]
