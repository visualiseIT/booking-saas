# Booking SaaS Platform

A modern appointment booking platform built with Next.js, Drizzle ORM, Clerk Auth, and Vercel Postgres.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FvisualiseIT%2Fbooking-saas&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,RESEND_API_KEY&integration-ids=oac_7gmZNmR4o6VWyxgkg9WfPrVn)

## Features

- 📅 Easy appointment scheduling
- 🔒 Authentication with Clerk
- 📧 Email notifications via Resend
- 📊 Calendar integration (Google, Apple, Outlook)
- 💼 Service provider dashboard
- 🎯 Customer booking portal
- ⚡ Built on Next.js and Vercel

## One-Click Deploy

1. Click the "Deploy with Vercel" button above
2. Set up the following environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Get from [Clerk Dashboard](https://dashboard.clerk.dev)
   - `CLERK_SECRET_KEY`: Get from [Clerk Dashboard](https://dashboard.clerk.dev)
   - `RESEND_API_KEY`: Get from [Resend Dashboard](https://resend.com/dashboard)
   - `DATABASE_URL`: Will be automatically set up by Vercel Postgres integration

The deploy button will:
1. Clone this repository to your GitHub account
2. Create a new Vercel project
3. Set up Vercel Postgres automatically
4. Deploy the application
5. Create database tables using Drizzle ORM

## Post-Deployment Setup

After deploying, you'll need to:

1. Set up your Clerk application:
   - Create a new application in [Clerk Dashboard](https://dashboard.clerk.dev)
   - Configure your OAuth providers (Google, etc.) if needed
   - Add your Vercel deployment URL to allowed origins

2. Configure Resend:
   - Verify your domain in Resend dashboard
   - Set up email templates

3. (Optional) Set up calendar integration:
   - Configure OAuth credentials for Google Calendar
   - Add calendar integration credentials to environment variables

## Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_GITHUB_USERNAME/booking-saas.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npm run db:generate
npm run db:push

# Start the development server
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database (Vercel Postgres)
DATABASE_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Resend Email
RESEND_API_KEY=

# Optional: Calendar Integration
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Tech Stack

- **Framework:** Next.js 14
- **Database:** Vercel Postgres
- **ORM:** Drizzle ORM
- **Authentication:** Clerk
- **Email:** Resend
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## License

MIT License
