FROM node:20.11.1-alpine3.19 AS base

# Installing turbo in builder stage
RUN npm install turbo --global

FROM base AS builder
RUN echo "Builder Stage"
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
COPY .  .
RUN turbo prune worker --docker

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
RUN turbo build --filter=worker...

FROM base AS runner
RUN echo "Runner Stage"
WORKDIR /app

# Creating a group and non-root user
RUN addgroup --system --gid 1001 worker-server
RUN adduser --system --uid 1001 worker-server
USER worker-server

COPY --from=installer --chown=worker-server:worker-server /app .

CMD ["sh", "-c", "cd /app/apps/worker && npm run dev"]