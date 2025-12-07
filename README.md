# IV-Site Template

A modern, customizable website template designed to work with IV-CMS. Build beautiful, responsive websites that pull content from your CMS while maintaining full control over design and functionality.

## Features

- **Next.js 15** - Modern React framework with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations
- **Dark/Light Mode** - Built-in theme switching
- **CMS Integration** - Ready to connect to IV-CMS
- **ISR Support** - Incremental Static Regeneration for optimal performance
- **Webhook Revalidation** - Instant content updates when CMS changes

## Quick Start

### 1. Clone or Copy the Template

```bash
# Clone the repository
git clone <your-repo-url> my-site
cd my-site

# Install dependencies
npm install
# or
pnpm install
```

### 2. Configure Environment

Copy the environment example and configure your settings:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# CMS Connection (optional - site works with static content if not configured)
CMS_URL=https://your-cms.vercel.app
CMS_API_KEY=sk_live_...
CMS_SITE_ID=site_...

# Site Branding
NEXT_PUBLIC_SITE_NAME=Your Site Name
NEXT_PUBLIC_SITE_TAGLINE=Your tagline here

# Cache Revalidation
REVALIDATE_SECRET=your-secret-here
```

### 3. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Customization

### Site Configuration

Edit `lib/config.ts` to customize:

- Site name and description
- Navigation items
- Footer links
- Social media links

### Branding & Colors

Edit `tailwind.config.ts` to customize:

- Primary and accent colors
- Typography (fonts)
- Shadows and animations

### Content

#### Without CMS (Static Mode)

Edit the static content directly in page files:
- `app/page.tsx` - Home page content
- `app/about/page.tsx` - About page
- `app/capabilities/page.tsx` - Capabilities
- etc.

#### With CMS (Dynamic Mode)

1. Deploy or access your IV-CMS instance
2. Create content in the CMS dashboard
3. Configure API keys in `.env.local`
4. Content will automatically be fetched and cached

## Project Structure

```
iv-site-template/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   └── revalidate/    # Cache revalidation webhook
│   ├── capabilities/      # Capabilities page
│   ├── contact/           # Contact page
│   ├── perspectives/      # Blog/articles
│   │   └── [slug]/        # Individual article
│   ├── solutions/         # Solutions page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections (Hero, Features, etc.)
│   └── ui/                # UI components (Button, Card)
├── lib/
│   ├── cms.ts             # CMS helper functions
│   ├── cms-client.ts      # Full CMS client
│   ├── config.ts          # Site configuration
│   └── utils.ts           # Utility functions
├── .env.example           # Environment template
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## CMS Integration

### Content Fetching

The template includes two ways to fetch CMS content:

1. **Simple helpers** (`lib/cms.ts`):
   ```typescript
   import { fetchPage, fetchCollectionItems } from "@/lib/cms";

   const page = await fetchPage("home");
   const articles = await fetchCollectionItems("perspectives");
   ```

2. **Full client** (`lib/cms-client.ts`):
   ```typescript
   import { createCMSClient } from "@/lib/cms-client";

   const client = createCMSClient({
     baseUrl: process.env.CMS_URL!,
     apiKey: process.env.CMS_API_KEY!,
   });

   const pages = await client.listPages();
   const article = await client.getCollectionItem("perspectives", "my-article");
   ```

### Cache Revalidation

Configure webhooks in your CMS to call `/api/revalidate` when content changes:

1. In your CMS dashboard, go to Site Settings > Webhooks
2. Add a webhook URL: `https://your-site.com/api/revalidate`
3. Set the secret header: `x-revalidate-secret: your-secret-here`
4. Select events to trigger revalidation

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Build the production version:

```bash
npm run build
npm run start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## License

MIT License - feel free to use this template for any project.

---

Built with IV-CMS
