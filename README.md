# PropertyAI Landing Page

A modern Next.js landing page for PropertyAI - an AI-powered property management platform featuring five specialized AI agents.

## Features

- 🏢 **5 AI Agents**: Layla (Leasing), Riya (Residents), Omar (Operations), Farah (Finance), and Nour (Landlord)
- 📧 **Waitlist System**: Email collection with Supabase backend
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS
- 🌍 **Dubai-Ready**: Multi-currency, bilingual support, Ejari sync
- 📱 **Responsive**: Mobile-first design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or pnpm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/settlelinecompany-commits/proptech-landing-page.git
cd proptech-landing-page
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migration:
   - Go to your Supabase dashboard
   - Open SQL Editor
   - Run `scripts/001_create_waitlist.sql`

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel Deployment

1. Push your code to GitHub (already done ✅)

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your GitHub repository: `settlelinecompany-commits/proptech-landing-page`

5. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click "Deploy"

Your site will be live at `https://your-project.vercel.app`

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── page.tsx        # Main landing page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities
│   └── supabase/       # Supabase clients
├── scripts/            # Database migrations
└── public/             # Static assets
```

## License

Private - All rights reserved

