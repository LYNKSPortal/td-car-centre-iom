# TD Car Centre - Premium Luxury Car Dealership Website

A full-stack luxury car dealership website built with Next.js 14+, featuring a dark premium design, comprehensive inventory management, and powerful search capabilities.

## 🚀 Features

### Public-Facing Features
- **Premium Homepage** - Cinematic hero section, featured vehicles, service highlights, and testimonials
- **Advanced Inventory Browsing** - Filterable, sortable vehicle listings with pagination
- **Vehicle Detail Pages** - Image galleries, specifications, features, and enquiry forms
- **Finance Calculator** - Interactive calculator with customizable terms
- **Service Pages** - Warranty, Part Exchange, Sell Your Car, Vehicle Sourcing
- **Contact & Enquiry System** - Multi-purpose enquiry forms with email notifications
- **Responsive Design** - Mobile-first, fully responsive across all devices

### Admin Features (To Be Implemented)
- Protected admin dashboard
- Vehicle CRUD operations
- Image upload and management
- Enquiry management
- Settings configuration

### Technical Features
- Server-side rendering for SEO
- URL-driven filters and pagination
- Type-safe database queries with Drizzle ORM
- Form validation with Zod
- Premium dark UI with Tailwind CSS
- Optimized images with Next.js Image

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Database**: Neon Postgres
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon Postgres account (free tier available)

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd td-car-centre
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Optional: NextAuth (for admin authentication - to be implemented)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

**To get your Neon DATABASE_URL:**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it into your `.env.local` file

### 3. Set Up the Database

Generate and run migrations:

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push
```

### 4. Seed the Database

Populate with sample luxury vehicles:

```bash
npm run db:seed
```

This will create:
- 10 luxury vehicles (Porsche, Ferrari, Lamborghini, etc.)
- Vehicle images and features
- Dealership settings
- Admin user (email: admin@tdcarcentre.co.uk, password: admin123)

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
td-car-centre/
├── app/                          # Next.js App Router
│   ├── (routes)/
│   │   ├── page.tsx             # Homepage
│   │   ├── inventory/           # Vehicle listings
│   │   ├── finance/             # Finance calculator
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   └── services/            # Service pages
│   ├── api/                     # API routes
│   │   └── enquiries/           # Enquiry submission
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── header.tsx               # Site header
│   ├── footer.tsx               # Site footer
│   ├── vehicle-card.tsx         # Vehicle card component
│   ├── vehicle-gallery.tsx      # Image gallery
│   ├── enquiry-form.tsx         # Enquiry form
│   └── finance-calculator.tsx   # Finance calculator
├── lib/                         # Utilities and helpers
│   ├── db/                      # Database configuration
│   │   ├── index.ts            # Database client
│   │   └── schema.ts           # Drizzle schema
│   ├── queries.ts              # Database queries
│   ├── validations.ts          # Zod schemas
│   └── utils.ts                # Utility functions
├── scripts/                     # Scripts
│   └── seed.ts                 # Database seeding
└── drizzle/                    # Migration files
```

## 🗄️ Database Schema

### Tables

**vehicles**
- Core vehicle information (make, model, year, price, etc.)
- Status tracking (available, reserved, sold)
- Featured flag for homepage display

**vehicle_images**
- Multiple images per vehicle
- Sortable order
- Alt text for accessibility

**vehicle_features**
- Equipment and features list
- Linked to vehicles

**enquiries**
- Customer enquiries
- Vehicle-specific or general
- Type categorization (finance, test drive, etc.)

**dealership_settings**
- Business information
- Contact details
- Opening hours
- Social media links

**users**
- Admin/staff authentication
- Role-based access

## 🎨 Design System

### Colors
- **Background**: Black (#000000), Zinc-950, Zinc-900
- **Text**: White, Zinc-300, Zinc-400
- **Accent**: Amber-500 (gold/yellow for CTAs and highlights)
- **Borders**: White/10, White/20 (subtle transparency)

### Typography
- **Font**: Inter
- **Headings**: Bold, large scale (4xl-7xl)
- **Body**: Regular, readable (base-xl)

### Components
- Dark cards with subtle borders
- Hover states with amber accents
- Smooth transitions
- Premium spacing and layout

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:generate      # Generate migrations
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio
npm run db:seed          # Seed database

# Build
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Ensure these are set in your production environment:
- `DATABASE_URL` - Your Neon Postgres connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Secure random string

## 📝 Customization

### Update Dealership Information

Edit the seed script or update via admin dashboard (when implemented):
- Business name, phone, email
- Address and opening hours
- Social media links

### Modify Vehicle Data

Add/edit vehicles in `scripts/seed.ts` or use the admin dashboard.

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline with Tailwind classes

## 🔐 Admin Access

**Default Admin Credentials** (created by seed script):
- Email: `admin@tdcarcentre.co.uk`
- Password: `admin123`

⚠️ **Important**: Change the default password in production!

## 📧 Enquiry System

Enquiries are stored in the database. To receive email notifications, integrate an email service:
- Resend
- SendGrid
- AWS SES

## 🎯 SEO Optimization

- Metadata configured for all pages
- Semantic HTML structure
- Image optimization with Next.js Image
- Dynamic Open Graph tags
- Sitemap and robots.txt (to be added)

## 🐛 Troubleshooting

**Database connection issues:**
- Verify DATABASE_URL is correct
- Check Neon project is active
- Ensure SSL mode is enabled

**Build errors:**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**TypeScript errors:**
- Run type check: `npx tsc --noEmit`

## 📄 License

This project is proprietary software for TD Car Centre.

## 🤝 Support

For support or questions, contact the development team.

---

Built with ❤️ for TD Car Centre
