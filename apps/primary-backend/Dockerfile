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
RUN turbo prune primary-backend --docker

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
RUN npm run build --filter=primary-backend...

FROM base AS runner
RUN echo "Runner Stage"
WORKDIR /app

# Creating a group and non-root user
# RUN addgroup --system --gid 1001 primary-backend-server
# RUN adduser --system --uid 1001 primary-backend-server

COPY --from=installer /app .

# Changing Ownership to non root user
# RUN chown -R primary-backend-server:primary-backend-server /app
# RUN chown -hR primary-backend-server:primary-backend-server /app

# USER primary-backend-server

# Make the entrypoint script executable
# RUN chmod +x /app/apps/primary-backend/scripts/entrypoint.sh

EXPOSE 3001

CMD cd /app/apps/primary-backend && npm run dev

# ENTRYPOINT ["/app/apps/primary-backend/scripts/entrypoint.sh"]