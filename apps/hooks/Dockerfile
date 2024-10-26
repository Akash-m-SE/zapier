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
RUN turbo build --filter=hooks...

FROM base AS runner
RUN echo "Runner Stage"
WORKDIR /app

# Creating a group and non-root user
RUN addgroup --system --gid 1001 hookserver
RUN adduser --system --uid 1001 hookserver
USER hookserver

COPY --from=installer --chown=hookserver:hookserver /app .

EXPOSE 3002

CMD ["sh", "-c", "cd /app/apps/hooks && npm run dev"]