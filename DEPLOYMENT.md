# Deployment Guide

This document provides step-by-step instructions for deploying the CodeAtRandom AI application.

## 🚀 Deploying to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications and offers free hosting.

### Method 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Visit [vercel.com](https://vercel.com) and sign in**
   - Sign in with your GitHub account

3. **Import your repository**
   - Click "New Project"
   - Select your repository from GitHub
   - Vercel will auto-detect Next.js configuration

4. **Configure (optional)**
   - Project Name: `codeatrandom-ai`
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at: `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - What's your project's name? `codeatrandom-ai`
   - In which directory is your code located? `./`

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

Your application will be deployed and you'll receive a live URL!

## 📦 Deploying to Netlify

### Method 1: Netlify Dashboard

1. **Build your app**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Configure build settings in Netlify dashboard:**
   - Build command: `npm run build`
   - Publish directory: `.next`

### Method 2: GitHub Integration

1. Push code to GitHub
2. Go to [netlify.com](https://www.netlify.com)
3. Click "New site from Git"
4. Choose your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

## 🐳 Deploying with Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm install
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   
   CMD ["npm", "start"]
   ```

2. **Build Docker image**
   ```bash
   docker build -t codeatrandom-ai .
   ```

3. **Run container**
   ```bash
   docker run -p 3000:3000 codeatrandom-ai
   ```

## ☁️ Deploying to AWS

### Using AWS Amplify

1. Push code to GitHub
2. Go to AWS Amplify Console
3. Choose "Host web app"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
6. Deploy

### Using AWS EC2

1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Clone your repository
5. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
6. Install PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start npm --name "codeatrandom" -- start
   pm2 startup
   pm2 save
   ```

## 🌐 Deploying to Railway

1. Visit [railway.app](https://railway.app)
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Next.js
6. Click "Deploy"

## 🔧 Environment Variables

This application doesn't require environment variables, but if you add any:

**Vercel:**
- Go to Project Settings → Environment Variables
- Add your variables

**Netlify:**
- Go to Site Settings → Build & Deploy → Environment
- Add your variables

## ✅ Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] Test skill gap API: `POST /api/skill-gap`
- [ ] Test roadmap API: `POST /api/roadmap`
- [ ] Test HackerNews API: `GET /api/hackernews`
- [ ] Test frontend form submission
- [ ] Test dashboard displays correctly
- [ ] Check responsive design on mobile
- [ ] Verify all links work
- [ ] Check 404 page

## 🐛 Troubleshooting

### Build Fails

**Issue**: `Module not found` errors

**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Routes Not Working

**Issue**: 404 on API endpoints

**Solution**: Ensure you're using Next.js API routes correctly. Check that files are in `pages/api/` directory.

### Vercel Deployment Times Out

**Solution**: 
- Check build logs for errors
- Ensure all dependencies are in `package.json`
- Try deploying with Vercel CLI for better error messages

## 📊 Performance Optimization

After deployment, consider:

1. **Enable caching** for static assets
2. **Add analytics** (Vercel Analytics, Google Analytics)
3. **Monitor performance** with Lighthouse
4. **Add error tracking** (Sentry, LogRocket)

## 🔐 Security Considerations

- All API routes include method validation
- Input validation on all endpoints
- No sensitive data exposed
- CORS handled by Next.js

---

**Live URL**: Your application will be live at:
- Vercel: `https://your-project.vercel.app`
- Netlify: `https://your-project.netlify.app`
- Custom domain: Configure in platform settings

Need help? Check the platform-specific documentation or open an issue.

