import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SkillGapResponse, RoadmapResponse, HackerNewsStory } from '@/types';
import SkillGapCard from '@/components/SkillGapCard';
import RoadmapCard from '@/components/RoadmapCard';
import TechNewsCard from '@/components/TechNewsCard';

interface CareerAnalysis {
  skillGap: SkillGapResponse;
  roadmap: RoadmapResponse;
  targetRole: string;
  currentSkills: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null);
  const [techNews, setTechNews] = useState<HackerNewsStory[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState('');

  useEffect(() => {
    // Load analysis from sessionStorage
    const storedData = sessionStorage.getItem('careerAnalysis');
    
    if (!storedData) {
      // Redirect to home if no data
      router.push('/');
      return;
    }

    try {
      const parsedData: CareerAnalysis = JSON.parse(storedData);
      setAnalysis(parsedData);
    } catch (error) {
      console.error('Error parsing stored data:', error);
      router.push('/');
      return;
    }

    // Fetch tech news
    fetchTechNews();
  }, [router]);

  const fetchTechNews = async () => {
    try {
      setNewsLoading(true);
      const response = await axios.get('/api/hackernews');
      setTechNews(response.data);
      setNewsError('');
    } catch (error) {
      console.error('Error fetching tech news:', error);
      setNewsError('Failed to load tech news');
    } finally {
      setNewsLoading(false);
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem('careerAnalysis');
    router.push('/');
  };

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your career analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">CodeAtRandom</span> AI
              </h1>
              <p className="text-sm text-gray-600">Career Analysis Dashboard</p>
            </div>
            <button
              onClick={handleStartOver}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Start Over
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Career Analysis for <span className="text-blue-600">{analysis.targetRole}</span>
          </h2>
          <p className="text-gray-600">
            Based on your current skills: {analysis.currentSkills.join(', ')}
          </p>
        </div>

        {/* Two Column Layout - Skill Gap & Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Skill Gap Results */}
          <div>
            <SkillGapCard skillGap={analysis.skillGap} />
          </div>

          {/* Right: Career Roadmap */}
          <div>
            <RoadmapCard roadmap={analysis.roadmap} />
          </div>
        </div>

        {/* Bottom Section - Tech News */}
        <div className="mt-8">
          <TechNewsCard 
            stories={techNews} 
            loading={newsLoading} 
            error={newsError}
            onRetry={fetchTechNews}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container py-6 text-center text-gray-600 text-sm">
          <p>© 2025 CodeAtRandom AI. Built with Next.js & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
}

