FROM node:20.11.1-alpine3.19 AS base

FROM base AS builder
RUN echo "Builder Stage"
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
# Installing turbo in builder stage
RUN npm install turbo --global
COPY .  .
RUN turbo prune processor --docker

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
# Installing turbo in installer stage
RUN npm install turbo --global
RUN turbo build --filter=processor

FROM base AS runner
RUN echo "Runner Stage"
WORKDIR /app

# Creating a group and non-root user
# RUN addgroup --system --gid 1001 processor-server
# RUN adduser --system --uid 1001 processor-server

COPY --from=installer /app .

# Changing Ownership to non root user
# RUN chown -R processor-server:processor-server /app

# USER processor-server

CMD cd /app/apps/processor && npm run dev