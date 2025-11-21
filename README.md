# CodeAtRandom AI - Career Path Analyzer

A full-stack web application that helps users analyze skill gaps, generate personalized career roadmaps, and stay updated with the latest tech news from HackerNews.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)](https://tailwindcss.com/)

## 🌐 Live Demo

- **GitHub Repository**: [https://github.com/0prateeksingh0/codeatrandom](https://github.com/0prateeksingh0/codeatrandom)
- **Live Application**: Deploy on Vercel for instant live demo

## 🚀 Features

### 1. **Career Goal Input Page**
- Select target role from predefined options
- Enter current skills (comma-separated)
- Clean, intuitive form interface

### 2. **Skill Gap Analyzer** (`POST /api/skill-gap`)
- Analyzes skills against predefined role requirements
- Returns:
  - **Matched Skills**: Skills you already have
  - **Missing Skills**: Skills you need to learn
  - **Match Percentage**: Your readiness for the role
  - **Recommendations**: Personalized advice based on your gap
  - **Suggested Learning Order**: Prioritized list of skills to learn

### 3. **Career Roadmap Generator** (`POST /api/roadmap`)
- Generates a 3-phase learning roadmap
- Each phase includes:
  - Duration estimate
  - Skills to learn
  - Detailed description
- Covers 8 predefined roles with custom roadmaps

### 4. **HackerNews Integration** (`GET /api/hackernews`)
- Fetches top 5 latest tech stories from HackerNews API
- Displays:
  - Story title and URL
  - Score (upvotes)
  - Posted time (relative format)
  - Story type
  - Author

### 5. **Combined Dashboard**
- **Left Side**: Skill gap analysis with visual progress bar
- **Right Side**: Career roadmap with 3 phases
- **Bottom Section**: Latest tech news from HackerNews
- Fully responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes (Node.js)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd codeatrandom
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
codeatrandom/
├── components/              # Reusable React components
│   ├── SkillGapCard.tsx    # Skill gap analysis display
│   ├── RoadmapCard.tsx     # Career roadmap display
│   └── TechNewsCard.tsx    # HackerNews stories display
├── data/
│   └── roleSkills.ts       # Predefined role requirements
├── pages/
│   ├── api/                # Backend API endpoints
│   │   ├── skill-gap.ts   # Skill gap analyzer API
│   │   ├── roadmap.ts     # Roadmap generator API
│   │   └── hackernews.ts  # HackerNews integration API
│   ├── _app.tsx           # Next.js app wrapper
│   ├── index.tsx          # Landing/input page
│   └── dashboard.tsx      # Results dashboard
├── styles/
│   └── globals.css        # Global styles with Tailwind
├── types/
│   └── index.ts           # TypeScript type definitions
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── next.config.js         # Next.js configuration
```

## 🔌 API Endpoints

### 1. Skill Gap Analyzer

**Endpoint**: `POST /api/skill-gap`

**Request Body**:
```json
{
  "targetRole": "Backend Developer",
  "currentSkills": ["Java", "Git", "SQL"]
}
```

**Response**:
```json
{
  "targetRole": "Backend Developer",
  "matchedSkills": ["Java", "Git", "SQL"],
  "missingSkills": ["Spring Boot", "APIs"],
  "matchPercentage": 60,
  "recommendations": [
    "You're halfway there with 60% skill match for Backend Developer.",
    "Focus on learning the missing skills in the suggested order.",
    "Practice your existing skills while learning new ones.",
    "Priority skills to learn: Spring Boot, APIs"
  ],
  "suggestedLearningOrder": ["APIs", "Spring Boot"]
}
```

### 2. Career Roadmap Generator

**Endpoint**: `POST /api/roadmap`

**Request Body**:
```json
{
  "targetRole": "Backend Developer"
}
```

**Response**:
```json
{
  "targetRole": "Backend Developer",
  "totalDuration": "4-7 months total",
  "roadmap": [
    {
      "phase": "Phase 1: Foundations",
      "duration": "1-2 months",
      "skills": ["Java basics", "OOP concepts", "Git version control"],
      "description": "Build strong programming fundamentals and learn version control."
    },
    {
      "phase": "Phase 2: Core Backend Skills",
      "duration": "2-3 months",
      "skills": ["Spring Boot framework", "SQL databases", "RESTful APIs", "Postman testing"],
      "description": "Master backend frameworks, databases, and API development."
    },
    {
      "phase": "Phase 3: Advanced & Deployment",
      "duration": "1-2 months",
      "skills": ["Deployment (Heroku/AWS)", "Real-world projects", "System design basics", "Microservices"],
      "description": "Learn deployment, system design, and build portfolio projects."
    }
  ]
}
```

### 3. HackerNews Integration

**Endpoint**: `GET /api/hackernews`

**Response**:
```json
[
  {
    "id": 38234567,
    "title": "Example Tech Story",
    "url": "https://example.com/story",
    "score": 245,
    "time": 1700000000,
    "type": "story",
    "by": "username"
  }
]
```

## 🎯 Available Roles

The application supports the following predefined roles:

1. **Frontend Developer** - HTML, CSS, JavaScript, React, Git
2. **Backend Developer** - Java, Spring Boot, SQL, APIs, Git
3. **Data Analyst** - Excel, SQL, Python, Dashboards, Statistics
4. **Full Stack Developer** - HTML, CSS, JavaScript, React, Node.js, SQL, Git, APIs
5. **DevOps Engineer** - Linux, Docker, Kubernetes, CI/CD, AWS, Git, Python
6. **Mobile Developer** - React Native, JavaScript, APIs, Git, Mobile UI/UX
7. **Data Scientist** - Python, Machine Learning, Statistics, SQL, Data Visualization, NumPy, Pandas
8. **UI/UX Designer** - Figma, Adobe XD, User Research, Prototyping, Design Systems, HTML, CSS

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

**OR** use Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the .next folder to Netlify
```

### Deploy to Other Platforms

Any platform supporting Node.js applications will work (Railway, Render, AWS, etc.)

## 🧪 Testing the Application

### Test Skill Gap API
```bash
curl -X POST http://localhost:3000/api/skill-gap \
  -H "Content-Type: application/json" \
  -d '{
    "targetRole": "Frontend Developer",
    "currentSkills": ["HTML", "CSS", "JavaScript"]
  }'
```

### Test Roadmap API
```bash
curl -X POST http://localhost:3000/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{
    "targetRole": "Frontend Developer"
  }'
```

### Test HackerNews API
```bash
curl http://localhost:3000/api/hackernews
```

## ⚙️ Configuration

No environment variables are required. The application works out of the box.

Optional configurations can be added in `next.config.js` if needed.

## 🔍 Key Implementation Details

### Skill Matching Algorithm
- Case-insensitive skill comparison
- Supports variations in skill names
- Calculates match percentage dynamically

### Roadmap Generation
- Role-specific learning paths
- Prioritized skill order based on dependencies
- Duration estimates based on industry standards

### Error Handling
- API validation for all endpoints
- User-friendly error messages
- Graceful fallbacks for API failures
- Loading states and retry mechanisms

### Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Grid-based layouts that adapt to screen sizes
- Touch-friendly interfaces

## 📝 Assumptions & Design Decisions

1. **Data Storage**: Using sessionStorage for temporary data (no database required)
2. **Skill Definitions**: Predefined roles with curated skill lists
3. **Roadmap Logic**: Mock AI with predefined learning paths (not dynamic AI)
4. **Case Sensitivity**: All skill matching is case-insensitive
5. **HackerNews**: Using public API (no authentication required)
6. **Session Handling**: Data persists only during browser session

## 🐛 Known Limitations

1. Roadmaps are predefined (not AI-generated)
2. No user authentication or data persistence
3. Limited to 8 predefined roles
4. HackerNews API may rate-limit requests

## 🤝 Contributing

This is an assignment project. For improvements:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is created as part of a coding assignment.

## 👨‍💻 Developer

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

---

## 📸 Screenshots

### Landing Page
The home page where users enter their target role and current skills.

### Dashboard
Combined view showing:
- Skill gap analysis (left)
- Career roadmap (right)
- Latest tech news (bottom)

---

## 🎓 Learning Resources

After receiving your analysis, consider:
- [freeCodeCamp](https://www.freecodecamp.org/)
- [The Odin Project](https://www.theodinproject.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)

---

**Happy Learning! 🚀**

