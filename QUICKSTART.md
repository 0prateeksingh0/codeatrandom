# Quick Start Guide

Get CodeAtRandom AI up and running in 5 minutes!

## ⚡ Quick Installation

### Prerequisites
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- npm or yarn package manager

### 3-Step Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   ```
   http://localhost:3000
   ```

That's it! 🎉

## 🎯 Using the Application

### Step 1: Enter Your Information
1. Select your **Target Role** from the dropdown
2. Enter your **Current Skills** (comma-separated)
   - Example: `HTML, CSS, JavaScript, React`
3. Click **"Analyze My Career Path"**

### Step 2: View Your Results
You'll see a comprehensive dashboard with:
- **Left**: Your skill gap analysis
  - Matched skills (what you have ✓)
  - Missing skills (what you need ⚠️)
  - Match percentage
  - Personalized recommendations
  - Suggested learning order
- **Right**: Your career roadmap
  - 3 phases of learning
  - Duration estimates
  - Skills for each phase
- **Bottom**: Latest tech news from HackerNews

### Step 3: Follow Your Roadmap
Use the generated roadmap to guide your learning journey!

## 🔥 Quick API Tests

Test the APIs using curl or Postman:

```bash
# Test Skill Gap API
curl -X POST http://localhost:3000/api/skill-gap \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"Frontend Developer","currentSkills":["HTML","CSS"]}'

# Test Roadmap API
curl -X POST http://localhost:3000/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"Backend Developer"}'

# Test HackerNews API
curl http://localhost:3000/api/hackernews
```

## 📦 Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🎨 Available Roles

Choose from 8 predefined roles:
1. Frontend Developer
2. Backend Developer
3. Data Analyst
4. Full Stack Developer
5. DevOps Engineer
6. Mobile Developer
7. Data Scientist
8. UI/UX Designer

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

## 📚 Need More Help?

- **Full Documentation**: See [README.md](README.md)
- **API Documentation**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
npm run dev -- -p 3001
```

### Build errors?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### API not working?
- Make sure you're running the dev server
- Check console for errors
- Verify request format matches API documentation

## 💡 Tips

1. **Skills Entry**: Enter skills exactly as they appear in role requirements for best matching
2. **Case Insensitive**: Skill matching is case-insensitive ("React" = "react")
3. **Multiple Skills**: Separate skills with commas: `HTML, CSS, JavaScript`
4. **Session Data**: Your analysis is stored in browser session (temporary)

## 🎯 Example Workflow

```
1. Select "Backend Developer"
2. Enter: Java, Git
3. Click Analyze
4. See: 40% match, missing Spring Boot, SQL, APIs
5. Follow 3-phase roadmap
6. Learn missing skills
7. Re-analyze when ready!
```

---

**Happy Learning! 🚀**

Start your career journey now at [http://localhost:3000](http://localhost:3000)

