# Deployment Guide - TD Car Centre

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Neon Postgres database (already set up)

## Step-by-Step Deployment to Vercel

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - TD Car Centre website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/td-car-centre.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### 3. Add Environment Variables

In Vercel project settings, add:

```
DATABASE_URL=your-neon-connection-string
```

### 4. Deploy

Click "Deploy" and wait for the build to complete.

### 5. Set Up Database (First Deployment Only)

After first deployment, you need to set up your production database:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Run database setup
vercel env pull .env.local
npm run db:push
npm run db:seed
```

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify vehicle listings display
- [ ] Test enquiry form submission
- [ ] Check finance calculator works
- [ ] Test mobile responsiveness
- [ ] Verify images load properly
- [ ] Test all navigation links
- [ ] Check SEO metadata
- [ ] Test contact form
- [ ] Verify sitemap.xml is accessible

## Custom Domain Setup

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., tdcarcentre.co.uk)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Environment Variables for Production

Required:
- `DATABASE_URL` - Your Neon Postgres connection string

Optional (for future features):
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Random secret string
- `RESEND_API_KEY` - For email notifications
- `UPLOADTHING_SECRET` - For image uploads

## Performance Optimization

### Enable Vercel Analytics
1. Go to project settings
2. Enable Analytics
3. Monitor performance metrics

### Image Optimization
- Already configured with Next.js Image
- Images are automatically optimized by Vercel

### Caching
- Static pages are automatically cached
- API routes can be configured with `revalidate`

## Monitoring

### Check Logs
```bash
vercel logs
```

### Monitor Database
- Use Neon dashboard to monitor queries
- Check connection pool usage
- Monitor storage usage

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure DATABASE_URL is accessible from Vercel

### Database Connection Issues
- Verify DATABASE_URL includes `?sslmode=require`
- Check Neon project is active
- Verify IP allowlist if configured

### Images Not Loading
- Check image URLs are accessible
- Verify Next.js Image configuration
- Check Vercel image optimization limits

## Rollback

If you need to rollback to a previous deployment:
1. Go to Vercel dashboard
2. Click "Deployments"
3. Find the working deployment
4. Click "..." menu
5. Select "Promote to Production"

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

## Security Checklist

- [ ] Change default admin password
- [ ] Add rate limiting to API routes
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Configure CORS if needed
- [ ] Review and update environment variables
- [ ] Enable Vercel security headers
- [ ] Set up monitoring and alerts

## Backup Strategy

### Database Backups
- Neon provides automatic backups
- Consider setting up additional backup schedule
- Test restore process

### Code Backups
- GitHub serves as code backup
- Consider enabling GitHub Actions for automated testing

## Support

For deployment issues:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Neon Documentation: [neon.tech/docs](https://neon.tech/docs)
- Next.js Documentation: [nextjs.org/docs](https://nextjs.org/docs)

---

**Your TD Car Centre website is now live! 🚀**
