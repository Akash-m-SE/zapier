#!/bin/sh
set -e

# Change to the root of the monorepo and run Turbo commands
cd /app

# Generate Prisma Client
echo "Generating prisma client"
cd /app/packages/database
npx prisma generate

# Migrating the database
echo "Migrating the database"
npx prisma migrate deploy

# Seeding the database
echo "Seeding the database"
cd /app/packages/database
npx prisma db seed