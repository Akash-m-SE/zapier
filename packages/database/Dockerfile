# Dockerfile for 
FROM node:20.11.1-alpine3.19 AS base

# Installing turbo globally
RUN npm install turbo --global

FROM base AS builder
RUN echo "Builder Stage"
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune @repo/db --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN echo "Installer Stage"
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .

FROM base AS runner
RUN echo "Runner Stage"
WORKDIR /app

COPY --from=installer /app .

ENTRYPOINT ["/app/packages/database/scripts/entrypoint.sh"]