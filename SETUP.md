# Quick Setup Guide - TD Car Centre

Follow these steps to get your TD Car Centre website up and running.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://username:password@host/database`)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="your-neon-connection-string-here"
```

Replace `your-neon-connection-string-here` with the connection string from Neon.

## Step 4: Set Up Database Schema

```bash
npm run db:push
```

This will create all the necessary tables in your Neon database.

## Step 5: Seed the Database

```bash
npm run db:seed
```

This will populate your database with:
- 10 luxury vehicles (Porsche, Ferrari, Lamborghini, etc.)
- Vehicle images and features
- Dealership settings
- Admin user credentials

## Step 6: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Admin Credentials

- **Email**: admin@tdcarcentre.co.uk
- **Password**: admin123

⚠️ **Important**: Change these credentials before deploying to production!

## What's Next?

### Customize Your Site

1. **Update Dealership Info**: Edit `scripts/seed.ts` and re-run `npm run db:seed`
2. **Add Your Vehicles**: Use the admin dashboard (to be implemented) or edit the seed script
3. **Customize Styling**: Modify Tailwind classes in components or update `app/globals.css`

### Deploy to Production

1. Push your code to GitHub
2. Create a Vercel account at [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add your `DATABASE_URL` environment variable in Vercel settings
5. Deploy!

## Troubleshooting

**Database connection error?**
- Make sure your `DATABASE_URL` is correct
- Check that your Neon project is active
- Ensure the connection string includes `?sslmode=require`

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**Need help?**
Check the main README.md for detailed documentation.

---

Happy building! 🚀
