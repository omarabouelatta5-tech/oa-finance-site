# OA Finance — business website (Next.js)

The brand name is a placeholder. Change `business.name` and `business.tagline` at the bottom of `lib/data.ts` and it updates everywhere (header, footer, page titles, structured data).

## Run it on your computer
1. Install Node.js 20 or newer from https://nodejs.org
2. Open a terminal in this folder and run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

## Put it online (free, easiest: Vercel)
1. Upload this folder to a new GitHub repository.
2. Go to https://vercel.com → "Add New Project" → pick the repository → Deploy.
3. After it is live, add an environment variable `NEXT_PUBLIC_SITE_URL` = your site link (for example `https://omar-abouelatta.vercel.app`) and redeploy. This makes link previews on LinkedIn and WhatsApp show your photo.

## Pages
- `/` Home · `/services` Services & packages · `/about` About the practice · `/contact` Contact

Packages (`packages` in `lib/data.ts`) have no prices on purpose; the button leads to the contact form. Add a `price` field there if you want to show one.

## Edit the content
All text, numbers, jobs, services and contact details are in one file: `lib/data.ts`.
The page layouts are in `components/pages/`.
Your photo is `public/assets/omar.jpg` (replace it with the same name to change it).

## Structure
- `app/` — page layout, global styles, SEO
- `components/pages/` — Home, About, Services, Contact
- `components/three/` — the 3D scenes (Three.js): hero ledger cards, n8n flow, career globe
- `components/` — header, footer, bento tiles, invoice demo, shared sections

## 3D
The 3D scenes use Three.js and need WebGL. They fade in once ready and are skipped automatically if the browser can't run WebGL, so the content is always readable.
- `lib/data.ts` — all content
