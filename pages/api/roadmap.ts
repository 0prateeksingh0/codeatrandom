import type { NextApiRequest, NextApiResponse } from 'next';
import { RoadmapRequest, RoadmapResponse, RoadmapPhase } from '@/types';
import { getRequiredSkills, normalizeRoleName } from '@/data/roleSkills';

// Generates 3-phase career roadmap
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoadmapResponse | { error: string }>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { targetRole }: RoadmapRequest = req.body;

    if (!targetRole || typeof targetRole !== 'string') {
      return res.status(400).json({ error: 'Target role is required and must be a string.' });
    }

    const normalizedRole = normalizeRoleName(targetRole);
    const requiredSkills = getRequiredSkills(targetRole);

    if (!requiredSkills) {
      return res.status(404).json({ 
        error: `Role "${targetRole}" not found. Available roles: Frontend Developer, Backend Developer, Data Analyst, Full Stack Developer, DevOps Engineer, Mobile Developer, Data Scientist, UI/UX Designer` 
      });
    }

    const roadmap = generateRoadmap(normalizedRole);
    const totalDuration = calculateTotalDuration(roadmap);

    const response: RoadmapResponse = {
      targetRole: normalizedRole,
      roadmap,
      totalDuration,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error in roadmap API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Generate 3-phase roadmap for role
function generateRoadmap(role: string): RoadmapPhase[] {
  const roadmaps: { [key: string]: RoadmapPhase[] } = {
    'Backend Developer': [
      {
        phase: 'Phase 1: Foundations',
        duration: '1-2 months',
        skills: ['Java basics', 'OOP concepts', 'Git version control'],
        description: 'Build strong programming fundamentals and learn version control.',
      },
      {
        phase: 'Phase 2: Core Backend Skills',
        duration: '2-3 months',
        skills: ['Spring Boot framework', 'SQL databases', 'RESTful APIs', 'Postman testing'],
        description: 'Master backend frameworks, databases, and API development.',
      },
      {
        phase: 'Phase 3: Advanced & Deployment',
        duration: '1-2 months',
        skills: ['Deployment (Heroku/AWS)', 'Real-world projects', 'System design basics', 'Microservices'],
        description: 'Learn deployment, system design, and build portfolio projects.',
      },
    ],
    'Frontend Developer': [
      {
        phase: 'Phase 1: Web Fundamentals',
        duration: '1-2 months',
        skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Git basics'],
        description: 'Master the building blocks of web development and version control.',
      },
      {
        phase: 'Phase 2: Modern Frameworks',
        duration: '2-3 months',
        skills: ['React fundamentals', 'Component architecture', 'State management', 'React Hooks'],
        description: 'Learn modern frontend frameworks and component-based development.',
      },
      {
        phase: 'Phase 3: Advanced & Projects',
        duration: '1-2 months',
        skills: ['Responsive design', 'API integration', 'Performance optimization', 'Portfolio projects'],
        description: 'Build real-world projects and optimize for production.',
      },
    ],
    'Data Analyst': [
      {
        phase: 'Phase 1: Data Fundamentals',
        duration: '1-2 months',
        skills: ['Excel advanced', 'SQL basics', 'Statistics fundamentals', 'Data cleaning'],
        description: 'Learn data manipulation, querying, and statistical concepts.',
      },
      {
        phase: 'Phase 2: Programming & Analysis',
        duration: '2-3 months',
        skills: ['Python basics', 'Pandas library', 'Data visualization', 'Exploratory analysis'],
        description: 'Master Python for data analysis and visualization techniques.',
      },
      {
        phase: 'Phase 3: Dashboards & Reporting',
        duration: '1-2 months',
        skills: ['Tableau/Power BI', 'Dashboard creation', 'Business intelligence', 'Case studies'],
        description: 'Create interactive dashboards and work on real-world datasets.',
      },
    ],
    'Full Stack Developer': [
      {
        phase: 'Phase 1: Frontend Basics',
        duration: '2-3 months',
        skills: ['HTML', 'CSS', 'JavaScript', 'React basics', 'Git'],
        description: 'Build a strong frontend foundation with modern technologies.',
      },
      {
        phase: 'Phase 2: Backend Development',
        duration: '2-3 months',
        skills: ['Node.js', 'Express.js', 'SQL databases', 'RESTful APIs', 'Authentication'],
        description: 'Learn server-side programming and database management.',
      },
      {
        phase: 'Phase 3: Integration & Deployment',
        duration: '2 months',
        skills: ['Full-stack integration', 'Deployment', 'Testing', 'Real-world projects'],
        description: 'Connect frontend and backend, deploy applications, build portfolio.',
      },
    ],
    'DevOps Engineer': [
      {
        phase: 'Phase 1: Linux & Scripting',
        duration: '1-2 months',
        skills: ['Linux fundamentals', 'Bash scripting', 'Git', 'Python basics', 'Networking'],
        description: 'Master Linux operating system and automation scripting.',
      },
      {
        phase: 'Phase 2: Containerization & CI/CD',
        duration: '2-3 months',
        skills: ['Docker', 'CI/CD pipelines', 'Jenkins/GitHub Actions', 'Infrastructure as Code'],
        description: 'Learn containerization and continuous integration/deployment.',
      },
      {
        phase: 'Phase 3: Cloud & Orchestration',
        duration: '2-3 months',
        skills: ['AWS/Azure basics', 'Kubernetes', 'Monitoring tools', 'Security best practices'],
        description: 'Master cloud platforms and container orchestration.',
      },
    ],
    'Mobile Developer': [
      {
        phase: 'Phase 1: JavaScript Fundamentals',
        duration: '1-2 months',
        skills: ['JavaScript ES6+', 'Git', 'Mobile UI/UX principles', 'React basics'],
        description: 'Build strong JavaScript foundation and understand mobile design.',
      },
      {
        phase: 'Phase 2: React Native',
        duration: '2-3 months',
        skills: ['React Native basics', 'Navigation', 'State management', 'Native modules'],
        description: 'Master React Native for cross-platform mobile development.',
      },
      {
        phase: 'Phase 3: APIs & Deployment',
        duration: '1-2 months',
        skills: ['API integration', 'App deployment', 'Testing', 'Performance optimization'],
        description: 'Connect to APIs, deploy to app stores, and optimize performance.',
      },
    ],
    'Data Scientist': [
      {
        phase: 'Phase 1: Programming & Math',
        duration: '2-3 months',
        skills: ['Python programming', 'Statistics', 'Linear algebra', 'SQL', 'NumPy'],
        description: 'Build strong programming and mathematical foundations.',
      },
      {
        phase: 'Phase 2: Machine Learning',
        duration: '3-4 months',
        skills: ['Pandas', 'Scikit-learn', 'ML algorithms', 'Model evaluation', 'Feature engineering'],
        description: 'Learn machine learning algorithms and data preprocessing.',
      },
      {
        phase: 'Phase 3: Advanced & Projects',
        duration: '2-3 months',
        skills: ['Deep learning', 'Data visualization', 'Big data tools', 'Real-world projects'],
        description: 'Explore advanced topics and build impressive portfolio projects.',
      },
    ],
    'UI/UX Designer': [
      {
        phase: 'Phase 1: Design Fundamentals',
        duration: '1-2 months',
        skills: ['Design principles', 'Color theory', 'Typography', 'User research', 'Figma basics'],
        description: 'Learn core design principles and research methodologies.',
      },
      {
        phase: 'Phase 2: Prototyping & Tools',
        duration: '2-3 months',
        skills: ['Figma advanced', 'Adobe XD', 'Prototyping', 'User testing', 'Design systems'],
        description: 'Master design tools and create interactive prototypes.',
      },
      {
        phase: 'Phase 3: Development & Portfolio',
        duration: '1-2 months',
        skills: ['HTML/CSS basics', 'Responsive design', 'Portfolio projects', 'Client collaboration'],
        description: 'Learn basic frontend skills and build a stunning portfolio.',
      },
    ],
  };

  return roadmaps[role] || generateGenericRoadmap(role);
}

// Generic roadmap for undefined roles
function generateGenericRoadmap(role: string): RoadmapPhase[] {
  return [
    {
      phase: 'Phase 1: Foundations',
      duration: '1-2 months',
      skills: ['Industry basics', 'Core tools', 'Best practices', 'Version control'],
      description: `Build foundational knowledge for ${role}.`,
    },
    {
      phase: 'Phase 2: Core Skills',
      duration: '2-3 months',
      skills: ['Advanced concepts', 'Key technologies', 'Practical projects', 'Problem solving'],
      description: `Develop core competencies required for ${role}.`,
    },
    {
      phase: 'Phase 3: Specialization',
      duration: '1-2 months',
      skills: ['Advanced topics', 'Real-world experience', 'Portfolio development', 'Networking'],
      description: `Specialize and build expertise in ${role}.`,
    },
  ];
}

// Calculate total duration from all phases
function calculateTotalDuration(roadmap: RoadmapPhase[]): string {
  let minMonths = 0;
  let maxMonths = 0;

  roadmap.forEach(phase => {
    const match = phase.duration.match(/(\d+)[-–](\d+)/);
    if (match) {
      minMonths += parseInt(match[1]);
      maxMonths += parseInt(match[2]);
    } else {
      const singleMatch = phase.duration.match(/(\d+)/);
      if (singleMatch) {
        const months = parseInt(singleMatch[1]);
        minMonths += months;
        maxMonths += months;
      }
    }
  });

  return `${minMonths}-${maxMonths} months total`;
}

