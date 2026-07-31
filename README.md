# Aurora — Serverless CMS Portfolio

A full-stack, single-page developer portfolio built with **React 19 + Vite + Tailwind CSS + Framer Motion**, backed entirely by **Supabase** as a serverless CMS. Every section — hero, about, skills, projects — is fetched from Supabase, and a login-protected `/admin` dashboard (real Supabase Auth, with a sign-in screen and a log-out button) lets you edit all of it with full CRUD, syncing to the public site live via Supabase Realtime (no page refresh needed).

---

## 1. Tech stack

| Layer | Choice |
|---|---|
| UI | React 19, Vite, Tailwind CSS, Framer Motion, react-icons |
| Routing | React Router DOM v6 (`/` and `/admin`) |
| Backend | Supabase (Postgres + Realtime + Row Level Security) |
| Deploy target | Vercel |

## 2. Folder structure

```
src/
├── assets/                  # static images/svgs used directly in code
├── components/
│   ├── admin/                # HeroForm, AboutForm, SkillsManager, ProjectsManager
│   ├── Hero.jsx, About.jsx, Skills.jsx, SkillCard.jsx
│   ├── Projects.jsx, ProjectCard.jsx, Contact.jsx
│   ├── Navbar.jsx, Footer.jsx, CursorGlow.jsx, Loader.jsx
├── pages/
│   ├── Home.jsx               # public portfolio (/)
│   ├── Login.jsx               # admin sign-in (/admin/login)
│   ├── Admin.jsx               # protected CMS dashboard (/admin)
│   └── NotFound.jsx
├── layouts/
│   ├── MainLayout.jsx
│   └── AdminLayout.jsx          # includes the Log out button
├── hooks/
│   └── useRealtimeTable.js     # subscribes to Supabase postgres_changes
├── services/
│   └── api.js                   # all CRUD functions (hero/about/skills/projects)
├── context/
│   ├── PortfolioContext.jsx     # fetches + live-syncs all portfolio data
│   └── AuthContext.jsx          # Supabase Auth session, signIn/signOut
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx       # redirects to /admin/login when signed out
├── supabase/
│   └── supabaseClient.js        # createClient() using env vars
├── styles/
│   └── index.css                # Tailwind layers + design tokens (glass, gradients)
└── utils/                        # (reserved for shared helpers)

supabase/
└── schema.sql                    # tables, RLS policies, realtime, seed data
```

## 3. Design language

Dark aurora theme: a near-black base (`#05060A`) with drifting violet/teal/pink radial glows, glassmorphic bento cards (`backdrop-filter: blur`), a **Space Grotesk** display face paired with **Inter** for body copy and **JetBrains Mono** for terminal-style eyebrows (`$ whoami`, `$ ls ./skills`) that tie the section labels to the developer-tool subject matter. Motion is deliberate: staggered hero entrance, scroll-triggered reveals, hover-lift on cards, an ambient pointer-following glow, and floating elements — not decoration for its own sake.

---

## 4. Local setup

### Prerequisites
- Node.js 18+
- A free [Supabase](https://supabase.com) account

### Install

```bash
npm install
```

### Configure environment variables

```bash
cp .env.example .env
```

Fill in:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

**Never commit `.env`** — it's already in `.gitignore`.

### Run

```bash
npm run dev
```

Visit `http://localhost:5173` for the portfolio and `http://localhost:5173/admin` for the dashboard.

---

## 5. Supabase setup (step by step)

1. Go to [supabase.com](https://supabase.com) → **New project**. Choose a name, database password, and region, then wait for provisioning (~2 min).
2. In the left sidebar, open **SQL Editor** → **New query**.
3. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**. This creates the `hero`, `about`, `skills`, `projects` tables, enables Row Level Security (public **read**, but writes require a signed-in user), turns on Realtime for all four tables, and inserts sample seed data.
4. Create your admin login: **Authentication → Users → Add user**. Set an email + password and check **Auto Confirm User**. This is the account you'll use to sign in at `/admin/login`.
5. Go to **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
6. Paste them into your local `.env` file as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
7. Restart `npm run dev` so Vite picks up the new env vars.
8. Open `/admin` in the browser — you'll be redirected to `/admin/login`. Sign in with the user you created in step 4, and you'll land on the dashboard with the seeded hero/about/skills/projects data ready to edit. Any save immediately reflects on `/` because of the Realtime subscription in `PortfolioContext.jsx`.

### About the `/admin` route and security

`/admin` is a real, authenticated route, not just a hidden one:
- `context/AuthContext.jsx` wraps Supabase Auth and exposes `session`, `signIn`, and `signOut`.
- `routes/ProtectedRoute.jsx` guards `/admin` — visiting it while signed out redirects to `/admin/login` (and back again after a successful sign-in).
- `pages/Login.jsx` is the sign-in screen; `layouts/AdminLayout.jsx` has a **Log out** button that ends the Supabase session and returns to `/admin/login`.
- The RLS policies in `schema.sql` only allow `insert`/`update`/`delete` `to authenticated` — so even someone with your anon key can't write to the database without logging in.
- There's no public sign-up screen; admin users are created manually in the Supabase dashboard (step 4 above), so only people you've explicitly added can ever log in.

---

## 6. Database schema reference

**hero** — `id, name, title, subtitle, resume, profile_image, email, github, linkedin, twitter, location, updated_at`
**about** — `id, description, updated_at`
**skills** — `id, name, category, icon, proficiency, created_at`
**projects** — `id, title, description, tech_stack (text[]), github_link, live_demo, image, created_at`

> Note: `hero` includes `email`, `github`, `linkedin`, `twitter`, `location` beyond the assignment's minimum field list so the Contact section and social icons can be fully data-driven from a single row, rather than hardcoded.

The `icon` field on `skills` expects a component name exported by `react-icons/fi` or `react-icons/si` (e.g. `SiReact`, `SiSupabase`, `FiGitBranch`) — `SkillCard.jsx` resolves it dynamically with a safe fallback icon.

---

## 7. Deployment guide (Vercel)

1. Push this project to GitHub (see section 8).
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import your GitHub repo.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build`. Output directory: `dist`.
5. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click **Deploy**. Vercel builds and gives you a live URL.
7. Because this is a client-side SPA, add a rewrite so deep links like `/admin` don't 404 on refresh — create a `vercel.json` at the project root:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
8. Redeploy after adding `vercel.json` if you add it post-deploy.

---

## 8. GitHub upload guide

```bash
git init
git add .
git commit -m "Initial commit: Aurora serverless CMS portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Confirm `.env` is **not** in the pushed files (check the repo on GitHub) — it should be excluded by `.gitignore`.

---

## 9. Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 10. What satisfies each assignment requirement

- **Dynamic content from Supabase**: `services/api.js` + `context/PortfolioContext.jsx` — no hardcoded hero/about/skills/projects text.
- **Full CRUD admin**: `pages/Admin.jsx` + `components/admin/*` cover create/update/delete for skills and projects, and update for hero/about.
- **Authenticated admin (login/logout)**: `context/AuthContext.jsx`, `pages/Login.jsx`, and `routes/ProtectedRoute.jsx` gate `/admin` behind Supabase Auth; `layouts/AdminLayout.jsx` provides the Log out control. RLS policies in `schema.sql` reject writes from anyone not signed in.
- **Live sync without refresh**: `hooks/useRealtimeTable.js` subscribes to Postgres changes on all four tables and refetches automatically.
- **React Router**: `/` (public) and `/admin` (dashboard), defined in `routes/AppRoutes.jsx`.
- **Premium UI**: glassmorphism, bento layout, aurora gradients, cursor glow, Framer Motion throughout — see `styles/index.css` and component files.
