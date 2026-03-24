# 🚀 Quick Start - TD Car Centre

Get your luxury car dealership website running in 5 minutes!

## Option A: Automatic Setup (Recommended)

### Step 1: Get Your Neon Database

1. Visit [neon.tech](https://neon.tech) and sign up (free)
2. Click "Create Project"
3. Name it "td-car-centre"
4. Copy the connection string shown

### Step 2: Configure Database

Create a file named `.env.local` in the project root:

```env
DATABASE_URL="paste-your-neon-connection-string-here"
```

**Important**: Make sure your connection string ends with `?sslmode=require`

### Step 3: Run Setup

```bash
# Install dependencies
npm install

# Set up database schema
npm run db:push

# Populate with sample luxury vehicles
npm run db:seed

# Start the development server
npm run dev
```

### Step 4: Open Your Site

Visit [http://localhost:3000](http://localhost:3000)

**That's it! Your luxury dealership website is now running! 🎉**

---

## Option B: Manual Neon Setup

If you prefer to use the Neon CLI:

```bash
# Install Neon CLI globally
npm install -g neonctl

# Login to Neon
neonctl auth

# Create a new project
neonctl projects create --name td-car-centre

# Get connection string
neonctl connection-string

# Copy the output to your .env.local file
```

Then continue with Step 3 from Option A.

---

## What You'll See

After setup, you'll have:

✅ **10 Luxury Vehicles** - Porsche, Ferrari, Lamborghini, Range Rover, etc.
✅ **Premium Homepage** - Hero section, featured vehicles, testimonials
✅ **Inventory System** - Filterable, sortable vehicle listings
✅ **Finance Calculator** - Interactive payment calculator
✅ **Service Pages** - Warranty, Part Exchange, Vehicle Sourcing
✅ **Contact System** - Enquiry forms throughout the site

## Default Admin Credentials

- **Email**: admin@tdcarcentre.co.uk
- **Password**: admin123

⚠️ Change these before going to production!

---

## Troubleshooting

### "Connection refused" or database errors?

**Check your DATABASE_URL:**
- Must start with `postgresql://`
- Must end with `?sslmode=require`
- No spaces or line breaks
- Example: `postgresql://user:pass@host.neon.tech/db?sslmode=require`

### "Module not found" errors?

```bash
rm -rf node_modules package-lock.json
npm install
```

### Database tables not created?

```bash
npm run db:push
```

### No vehicles showing?

```bash
npm run db:seed
```

---

## Next Steps

### Customize Your Site

1. **Update Business Info**: Edit `scripts/seed.ts` (dealership settings section)
2. **Add Your Vehicles**: Modify the vehicle data in `scripts/seed.ts`
3. **Change Colors**: Update Tailwind classes in components
4. **Add Your Logo**: Replace logo text in `components/header.tsx`

### Deploy to Production

See `DEPLOYMENT.md` for complete deployment instructions to Vercel.

---

## Need Help?

- 📖 Full documentation: `README.md`
- 🚀 Deployment guide: `DEPLOYMENT.md`
- 📊 Project overview: `PROJECT_SUMMARY.md`

---

**Happy building! Your luxury car dealership website is ready to go! 🏎️✨**
