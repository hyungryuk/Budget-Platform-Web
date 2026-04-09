@AGENTS.md

# Budget Platform Web

User-facing website for the **Budget Platform** project — a personal finance tool that helps users save budget and plan billing strategies to grow their budget.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Auth + Database | Supabase (`@supabase/supabase-js`, `@supabase/ssr`) |
| CI | GitHub Actions (`.github/workflows/ci.yml`) |
| CD | Vercel (auto-deploy on push to `main`) |
| Node.js | v22 (via Homebrew `node@22`) |

## Environment

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Stored in `.env.local` (gitignored). Also set in GitHub Actions secrets and Vercel environment variables.

## Running locally

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npm run dev
```

## Project structure

```
src/
├── app/
│   ├── auth/
│   │   └── actions.ts        # Server actions: login, signup, signout
│   ├── dashboard/
│   │   └── page.tsx          # Protected dashboard (placeholder)
│   ├── login/
│   │   └── page.tsx          # Sign in page
│   ├── signup/
│   │   └── page.tsx          # Sign up page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabase/
│       ├── client.ts         # Browser Supabase client
│       └── server.ts         # Server Supabase client (cookie-based)
└── middleware.ts              # Route protection — redirects unauthenticated users to /login
```

## Auth flow

- `middleware.ts` guards all routes
- Unauthenticated users → redirected to `/login`
- Authenticated users visiting `/login` or `/signup` → redirected to `/dashboard`
- Auth actions use Next.js server actions (no API routes)

## Build plan progress

### Phase 1 — Foundation
- [x] P1-1: Project setup (Next.js + Tailwind + Supabase)
- [x] P1-2: Auth — sign up / sign in / sign out
- [ ] P1-3: Layout — sidebar nav, header, protected routes  ← **next**

### Phase 2 — Budget Core
- [ ] P2-1: Budget overview dashboard (total balance, income, expenses)
- [ ] P2-2: Add / edit / delete transactions
- [ ] P2-3: Categories
- [ ] P2-4: Monthly summary with charts

### Phase 3 — Billing Plans
- [ ] P3-1: Create billing plans (recurring expenses)
- [ ] P3-2: Bill calendar
- [ ] P3-3: Budget vs. plan comparison

### Phase 4 — Strategy & Growth
- [ ] P4-1: Savings goals
- [ ] P4-2: Budget strategy recommendations
- [ ] P4-3: Notifications / reminders

### Phase 5 — Polish
- [ ] P5-1: Responsive mobile design
- [ ] P5-2: Dark mode
- [ ] P5-3: Export data (CSV / PDF)

## Conventions

- Build **one feature at a time** — user drives the pace
- Use **server actions** for mutations (no separate API routes)
- Use **server components** by default, client components only when needed (interactivity, hooks)
- Supabase **browser client** → `src/lib/supabase/client.ts`
- Supabase **server client** → `src/lib/supabase/server.ts`
- All new pages go under `src/app/`
