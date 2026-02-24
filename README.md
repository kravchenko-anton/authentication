# Auth Code

This repository contains a **Next.js 16** client and a **NestJS (v11)** API that together implement a full authentication flow (credentials + Google OAuth, email verification, password recovery, profile settings). The goal is to provide a drop-in SPA + API bundle that you can start locally without additional architectural layers.

## High-level layout

- `client/` – Next.js app (app Router) with `react-hook-form`, `react-query`, shadcn/tailwind UI primitives, and a shared `hooks/services/schemas` surface.
- `server/` – NestJS app with Prisma, Redis session storage, ReCaptcha + Google OAuth helpers, and the full authentication domain (users, accounts, email, tokens). 

## Requirements

- **PostgreSQL** for Prisma; supply a `DATABASE_URL` with a database you can migrate.
- **Redis** for session management (or you can use a compatible mock – just point `REDIS_URL` at it).
- **Google OAuth + ReCaptcha credentials** for the OAuth path (see `.env.example` files inside `server/` and `client/`).
- **Resend API key** if you want the email flow to send real mail.

## Quick start

1. **Backend**
   - `cd server`
   - `cp .env.example .env` and fill every required value (at a minimum: `DATABASE_URL`, `REDIS_URL`, `SERVER_URL`, `APPLICATION_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_RECAPTCHA_SECRET_KEY`, `COOKIES_SECRET`, `SESSION_SECRET`, `TOKEN_SECRET`, `RESEND_API_KEY` if you want email delivery). Keep `PORT` (default `4000`) and the `SESSION_*` values aligned with the client’s cookies.
   - `yarn install` (or `npm install`)
   - `npx prisma generate` (ensures the Prisma client is compiled)
   - "docker-compose up -d" to start Redis and PostgreSQL for local development.
   - `yarn start:dev` to launch the API at `http://localhost:4000` (or `yarn start:prod` once you’ve built it).

2. **Frontend**
   - `cd client`
   - `cp .env.example .env`
   - Update `SERVER_URL` to match the backend URL (`http://localhost:4000` by default) and `GOOGLE_RECAPTCHA_SITE_KEY` / `SESSION_COOKIE_NAME` so the forms can submit and ReCaptcha validates.
   - `yarn install` (or `npm install`)
   - `yarn dev` to run Next.js on `http://localhost:3000`
   - The login/register pages will render the shared forms, including the Google button, reCAPTCHA, and the shared TanStack/react-query hooks. The dashboard settings page hits the `/users/profile` endpoint and shows the user button with logout.

