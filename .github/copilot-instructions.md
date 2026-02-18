<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Make It Exist - Development Instructions

## Project Overview
This is a Next.js 14 (App Router) project for the "Make It Exist" platform — a student-built technology services platform for AIM (Asian Institute of Management) students.

## Tech Stack
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: Tailwind CSS with custom AIM theming (Navy, Gold, White)
- **Animations**: Framer Motion
- **Database**: Vercel Postgres (`@vercel/postgres`)
- **Validation**: Zod
- **Icons**: Lucide React
- **Theme**: next-themes (dark/light mode)
- **Toasts**: react-hot-toast

## Key Conventions
- All components use `'use client'` directive for client-side interactivity
- AIM email validation: all emails must end with `@aim.edu`
- Build scheduling is restricted to **Saturdays and Sundays only**
- Free services: Websites only
- Charged services: Mobile Apps, Web Apps, LLM Solutions, Emerging Tech (based on developer availability)
- AIM color scheme: Navy (#0A1628), Gold (#C8A951), Blue (#1B3A6B)
- Mobile-first responsive design
- All API routes are in `src/app/api/`
- Database operations are in `src/lib/db/`
- Form validation schemas are in `src/lib/validation.ts`

## Deployment
- Target platform: Vercel
- Database: Vercel Postgres
- Environment variables defined in `.env.local.example`
