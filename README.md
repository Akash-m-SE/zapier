
# Zapier Clone

<img src="https://hosted-documents-akash.s3.eu-central-1.amazonaws.com/Zapier+Clone+/Zapier+CLone+github+readme+files/zapierlogo.png" alt="Logo">

**Zapier Clone** is a microservices-based automation platform that simplifies and streamlines various workflows. The frontend is developed using Next.js, while Node.js handles the backend services. It features efficient code management with Turborepo, quick task processing with Kafka, and customizable workflows through webhooks, making the platform both powerful and user-friendly.


## Features 🌟

- **Microservices Architecture:** Utilizes Next.js for the frontend and Node.js for backend services, ensuring scalability and flexibility.

- **Efficient Code Management:** Leveraged Turborepo for streamlined monorepo management, improving development efficiency and reducing build times.

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

- `apps/primary-backend`:  Manages API endpoints, processes requests, handles authentication, and interacts with the database.

- `apps/processor`: The processor fetches pending events from the zapRunOutbox table, sends them to Kafka for processing, and deletes the processed events, enabling reliable event-driven workflow execution.

- `apps/worker`: Processes background tasks and handles webhook events using Kafka for task queuing and management. Manages data transactions and triggers workflows based on incoming requests.


#### Packages

- `@repo/ui`: A shared React component library that can be used by any application within the monorepo

- `@repo/eslint-config`: shared ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`) for use across any project in the monorepo.


- `@repo/typescript-config`: shared `tsconfig.json` files used throughout the monorepo, applicable to any project.

- `@repo/db`: Handles Prisma ORM setup for database interactions, including schema definitions, migrations, and seeding data.

- `@repo/http-status`: Provides custom HTTP status codes and messages for consistent and readable error handling throughout the application.

- `@repo/mailer-config`: Includes configuration settings for the mailing system, facilitating email setup and management.

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


## Environment Setup 🛠️ {#environment-setup}

To run this project, you will need to add the following environment variables to your .env files (templates are provided as .env.example in each package where .env needs to be setup)

- apps/hooks:- `PORT`

- apps/worker:- `GMAIL` `GOOGLE_CLIENT_ID` `GOOGLE_CLIENT_SECRET` `GOOGLE_REDIRECT_URI` `GOOGLE_OAUTH_ACCESSTOKEN` `GOOGLE_OAUTH_REFRESHTOKEN`

- apps/frontend:- `NEXT_PUBLIC_FRONTEND_URL` `NEXT_PUBLIC_BACKEND_URL` `NEXT_PUBLIC_HOOKS_URL`

- apps/primary-backend:- `PORT` `JWT_PASSWORD` `CORS_ORIGIN` `ACCESS_TOKEN_SECRET` `ACCESS_TOKEN_EXPIRY` `REFRESH_TOKEN_SECRET` `REFRESH_TOKEN_EXPIRY` 

  `GMAIL` `GOOGLE_CLIENT_ID` `GOOGLE_CLIENT_SECRET` `GOOGLE_REDIRECT_URI` `GOOGLE_OAUTH_ACCESSTOKEN` `GOOGLE_OAUTH_REFRESHTOKEN`

- packages/database:- `DATABASE_URL`
## Installation 🔧

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

 **8.**  Once started, the terminal will display the URLs where each service is hosted on their respective ports.

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

- **Frontend:** Next.js, TailwindCSS, React Hook Form, Zustand, React Flow

- **Backend:** Node.js, Express.js, bcryptjs

- **Database:** PostgreSQL, Prisma

- **Validation:** Zod

- **Task Processing:** Kafka

- **Authentication:** Cookie-based authentication with bcrypt for validation

- **Development Tools:** Turborepo, esbuild, Nodemon

- **Deployment & Caching:** Vercel (with caching via Turborepo)
