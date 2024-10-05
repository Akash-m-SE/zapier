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
RUN turbo prune hooks --docker

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
RUN turbo build --filter=hooks...

FROM base AS runner
RUN echo "Runner Stage"
WORKDIR /app

# Creating a group and non-root user
# RUN addgroup --system --gid 1001 hookserver
# RUN adduser --system --uid 1001 hookserver

COPY --from=installer /app .

# Changing Ownership to non root user
# RUN chown -R hookserver:hookserver /app

# USER hookserver

EXPOSE 3002

CMD cd /app/apps/hooks && npm run dev