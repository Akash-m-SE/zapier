# Zapier Clone

<img src="https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/zapierlogo.png" alt="Logo">

**Zapier Clone** is a microservices-based automation platform that simplifies and streamlines various workflows. The frontend is developed using Next.js, while Node.js handles the backend services. It features efficient code management with Turborepo, quick task processing with Kafka, and customizable workflows through webhooks, making the platform both powerful and user-friendly.

## Demo 🎥

https://github.com/user-attachments/assets/3cea80f1-f962-457c-8a28-d92ea7cb5333

If the above player does not work, you can watch the demo video here:

[Watch the Demo Video](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/Zapier+Clone+Demo.mp4)

## Features 🌟

- **Microservices Architecture:** Utilizes Next.js for the frontend and Node.js for backend services, ensuring scalability and flexibility.

- **Efficient Code Management:** Leveraged Turborepo for streamlined monorepo management, improving development efficiency and reducing build times.

- **Dockerized Applications:** All applications are dockerized, with a comprehensive Docker Compose setup that starts all required services, facilitating a seamless development and deployment process.

- **Dashboard:** Includes an informative dashboard for managing zaps.

- **Workflow Configuration:** Utilizes React Flow for creating and configuring actions and triggers to build zaps.

- **OTP Verification Services:** Supports email verification and password reset via OTP.

- **Optimized Task Processing:** Employs Kafka-based processing for quick and reliable task handling.

- **Customizable Workflows:** Supports custom webhooks for user-defined workflows, including actions like sending emails and more.

- **Scalable Integration:** Designed to handle diverse integrations and automate various tasks across different services.

- **User-Friendly Automation:** Provides an intuitive interface for setting up and managing automation workflows, enhancing user experience.

## Monorepo and Package Structure 📁

This project uses a monorepo architecture managed by Turborepo. The repository is divided into the following apps and packages:

#### Apps

- `apps/frontend`: Handles the user interface with Next.js, managing interactions, displaying data, and connecting to backend services through API calls.

- `apps/hooks`: Processes incoming webhooks, stores events in the database, and adds tasks to zapRunOutbox for Kafka processing.

- `apps/primary-backend`: Manages API endpoints, processes requests, handles authentication, and interacts with the database.

- `apps/processor`: The processor fetches pending events from the zapRunOutbox table, sends them to Kafka for processing, and deletes the processed events, enabling reliable event-driven workflow execution.

- `apps/worker`: Processes background tasks and handles webhook events using Kafka for task queuing and management. Manages data transactions and triggers workflows based on incoming requests.

#### Packages

- `@repo/ui`: A shared React component library that can be used by any application within the monorepo

- `@repo/eslint-config`: shared ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`) for use across any project in the monorepo.

- `@repo/typescript-config`: shared `tsconfig.json` files used throughout the monorepo, applicable to any project.

- `@repo/db`: Handles Prisma ORM setup for database interactions, including schema definitions, migrations, and seeding data.

- `@repo/http-status`: Provides custom HTTP status codes and messages for consistent and readable error handling throughout the application.

- `@repo/mailer-config`: Includes configuration settings for the mailing system, facilitating email setup and management.

- `@repo/kafka-config`: Exports essential Kafka configuration parameters, including the Topic Name and Kafka Broker URL.

- `@repo/zod-schemas`: Contains Zod schemas for data validation and type-safe parsing across the application.

## Screenshots 📸

![App Screenshot](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/mainpage.jpg)

![App Screenshot](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/login.jpg)

![App Screenshot](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/signuppage.jpg)

![App Screenshot](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/forgotpassword.jpg)

![App Screenshot](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/dashboard.jpg)

![App Screenshot](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/sendemailselector.jpg)

![App Screenshot](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/sendsolanaselector.jpg)

![App Screenshot](https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/zapcreation.jpg)

## Deployment 🚀

You can access the live version of Zapier Clone here: [Live Demo](https://zapier-frontend-eight.vercel.app/)

<a name="environment-setup"></a>

## Environment Setup 🛠️

You will need to obtain credentials from the respective services:

- **Resend:** Sign in at at [Resend](https://resend.com/) and create an api key to get your `RESEND_API_KEY`.

To run this project, you will need to add the following environment variables to your .env files (templates are provided as .env.example in each package where .env needs to be setup)

- apps/frontend - `NEXT_PUBLIC_FRONTEND_URL` `NEXT_PUBLIC_BACKEND_URL` `NEXT_PUBLIC_HOOKS_URL`

- apps/primary-backend - `PORT` `JWT_PASSWORD` `FRONTEND_URL` `CORS_ORIGIN` `ACCESS_TOKEN_SECRET` `ACCESS_TOKEN_EXPIRY` `REFRESH_TOKEN_SECRET` `REFRESH_TOKEN_EXPIRY` `RESEND_API_KEY`

- apps/hooks - `PORT`

- apps/processor - `KAFKA_BROKER`

- apps/worker - `SOL_PRIVATE_KEY` `RESEND_API_KEY` `KAFKA_BROKER`

- packages/database - `DATABASE_URL`

- packages/kafka-config - `KAFKA-BROKER`

- packages/mailer-config - `GMAIL` `RESEND_API_KEY`

## Installation 🔧

**Docker Compose**

**1.** Git Clone the Repository

**2.** Navigate to the directory where the repository was downloaded

**3.** Set up the [Environment Variables](#environment-setup) for each respective package

**4.** Dockerize the Applications and start all the containers

```
docker-compose up
```

The following containers will be build (if not built already) and started:

- **Frontend**: Main web application. Access it from [Port:3000](http://localhost:3000).

- **Primary Backend**: The main primary backend of the application. Handles authorization, authentication and other API calls. Access it from [Port: 3001](http://localhost:3001)

- **Hooks**: Manages custom webhook API calls. Access it from [Port:3002](http://localhost:3002).

- **Processor**: Produces messages to the Kafka topic.

- **Worker**: Consumes messages from the Kafka topic and processes actions.

- **Postgres**: PostgreSQL database container. Access it from [Port:5432](http://localhost:5432).

- **Zookeeper**: Coordinates Kafka's distributed system.

- **Kafka**: Message queuing system. Access it from [Port:9092](http://localhost:9092).

- **Prisma Service**: Generates the Prisma client, migrates the database, and seeds data.

##

**Local Installation**

**1.** Git Clone the Repository

**2.** Navigate to the directory where the repository was downloaded

**3.** Set up the [Environment Variables](#environment-setup) for each respective package

**4.** In the root directory of the monorepo, install the dependencies for all packages using Turborepo

```
npm install
```

**5.** Start a PostgreSQL container

```
docker run --name zapier-clone-db -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

- From the root directory of the monorepo run this command to automatically migrate our database and generate our type-safe Prisma client.

```
turbo db:push db:generate
```

Note: If you need to seed data into the database, follow these steps:

- From the root directory of the monorepo, navigate to the database package:

```
cd packages/database
```

- Run the following command to seed dummy data into the database:

```
npx prisma db seed
```

This will seed a `webhook` trigger and `send-solana` as well as `send-email` actions

**6.** Start a Kafka container

```
docker run --name zapier-processor-kafka -d -p 9092:9092 apache/kafka:3.7.1
```

Docker exec into the kafka container

```
docker exec -it <kafka-container-id> /bin/bash
```

Navigate to the Kafka Binaries Directory

```
cd /opt/kafka/bin
```

Create the kafka topic

```
./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092
```

**7.** Start the application in development mode

```
npm run dev
```

Note:- You can run this command in the root directory to start the entire application in development mode, or you can run it within individual packages if you only want to run specific parts.

**8.** Once started, the terminal will display the URLs where each service is hosted on their respective ports.

## Build ⚙️

To build all apps and packages navigate to the parent directory, run the following command:

```
npm run build
```

This will build the entire monorepo, ensuring that all services are compiled and ready for deployment.

## Remote Caching 🧩

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), navigate to the parent directory of the turborepo then enter the following command:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Authors ✍️

- [Akash](https://github.com/Akash-m-SE)

## Tech Stack 💻

- **Languages:** TypeScript

- **Frontend:** Next.js, TailwindCSS, React Hook Form, Zustand, React Flow, Shadcn/ui

- **Backend:** Node.js, Express.js, bcryptjs

- **Database:** PostgreSQL, Prisma

- **Validation:** Zod

- **Task Processing:** Kafka

- **Authentication:** Cookie-based authentication with bcrypt for validation

- **Email Service:** Resend (for OTPs and other messages)

- **Containerization:** Docker

- **Container Orchestration:** Docker Compose

- **Development Tools:** Turborepo, esbuild, Nodemon

- **Deployment & Caching:** Vercel (with caching via Turborepo)
