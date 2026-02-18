# Make It Exist 🚀

**By AIM Students, For AIM Students**

Make It Exist is an enterprise-grade platform built by students of the Asian Institute of Management (AIM) to empower fellow students to launch their businesses and careers through technology.

## 🌟 What We Offer

| Service | Pricing | Availability |
|---------|---------|-------------|
| **Websites** | ✅ Free | Always Available |
| **Mobile Apps** | 💰 Charged | Based on Developer Availability |
| **Web Applications** | 💰 Charged | Based on Developer Availability |
| **Custom LLM Solutions** | 💰 Charged | Based on Developer Availability |
| **Emerging Tech** | 💰 Charged | Based on Developer Availability |

## 📅 Weekend Build Schedule

All development work is conducted exclusively on **Saturdays and Sundays**, allowing our student developers to balance their AIM coursework while delivering exceptional projects.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom AIM theming
- **Animations**: Framer Motion
- **Database**: Vercel Postgres
- **Validation**: Zod
- **Icons**: Lucide React
- **Theme**: Dark/Light mode with next-themes
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- A Vercel account (for Postgres database)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd makeItExist

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the Vercel Postgres credentials from your Vercel project dashboard.

### Database Setup

The database tables are automatically created on first API request. Alternatively, you can run:

```bash
npm run db:setup
```

## 🎨 AIM Theming

The platform uses AIM's official brand colors:

- **Navy**: `#0A1628` — Primary dark color
- **Blue**: `#1B3A6B` — Secondary blue
- **Gold**: `#C8A951` — Accent/highlight color
- **White**: `#FAFBFC` — Light background

Both dark and light modes are fully supported.

## 📧 AIM Email Requirement

All users must provide their AIM email address (`@aim.edu`) for:
- Project request submission
- Communication and updates
- Identity verification

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── requests/route.ts    # Project request submission API
│   │   └── schedule/route.ts    # Schedule availability API
│   ├── globals.css               # Global styles + Tailwind
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Main landing page
├── components/
│   ├── about.tsx                 # Mission & values section
│   ├── footer.tsx                # Site footer
│   ├── hero.tsx                  # Hero/landing section
│   ├── how-it-works.tsx          # Process steps
│   ├── navbar.tsx                # Navigation bar
│   ├── providers.tsx             # Theme + toast providers
│   ├── request-form.tsx          # Multi-step project request form
│   ├── schedule-viewer.tsx       # Weekend schedule browser
│   ├── services.tsx              # Services showcase
│   └── stats.tsx                 # Statistics section
└── lib/
    ├── constants.ts              # Services, slots, configuration
    ├── db/index.ts               # Database operations
    ├── scheduling.ts             # Weekend date utilities
    ├── types.ts                  # TypeScript type definitions
    └── validation.ts             # Zod validation schemas
```

## 🖥 Development

```bash
# Start dev server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🌐 Deployment

This project is designed to be deployed on [Vercel](https://vercel.com):

1. Push to GitHub
2. Connect repository to Vercel
3. Add Postgres database from Vercel Storage
4. Environment variables are auto-populated
5. Deploy!

## 📝 License

This project is built for and by the AIM student community.

---

**Lead. Inspire. Transform.** — Asian Institute of Management
