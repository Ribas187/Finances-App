# TurboStack 

A blazing-fast, powered by turborepo, SaaS template made with NextJS, Prisma, Resend, S3 and more.

## Requirements

- NodeJS 20

## Install steps

We highly recommend the use of `pnpm` as your package manager. If you don't have it installed, you can install following the code below

```bash
npm install -g pnpm@latest
```

With `pnpm` installed, do the following steps:

Install the dependencies

```bash
pnpm install
```

Build the packages

```bash
pnpm run build
```

Create the `@prisma/client`
```bash
cd apps/web
pnpm dlx prisma migrate dev
```

Run your application
```bash
pnpm run dev
```

Open `localhost:3000` and access your application.

## Acessing the app version

TurboStack was made to allow you create a SaaS with the subdomain `app` to allow you to divide the landing page from your application.

To achieve this in development, you have to edit your `/etc/hosts` creating a symbolic link between `app.localhost` subdomain and your localhost.

Add the following line to your `/etc/hosts` file

```
127.0.0.1 app.localhost
```

Save it and now you can access the app version at `app.localhost:3000`