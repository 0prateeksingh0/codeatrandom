import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  const [targetRole, setTargetRole] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Predefined roles for dropdown
  const availableRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Data Analyst',
    'Full Stack Developer',
    'DevOps Engineer',
    'Mobile Developer',
    'Data Scientist',
    'UI/UX Designer',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!targetRole.trim()) {
      setError('Please select or enter a target role');
      return;
    }

    if (!currentSkills.trim()) {
      setError('Please enter your current skills');
      return;
    }

    setLoading(true);

    try {
      // Parse skills from comma-separated string
      const skillsArray = currentSkills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      if (skillsArray.length === 0) {
        setError('Please enter at least one skill');
        setLoading(false);
        return;
      }

      // Call both APIs in parallel
      const [skillGapResponse, roadmapResponse] = await Promise.all([
        axios.post('/api/skill-gap', {
          targetRole,
          currentSkills: skillsArray,
        }),
        axios.post('/api/roadmap', {
          targetRole,
        }),
      ]);

      // Store results in sessionStorage for dashboard page
      sessionStorage.setItem('careerAnalysis', JSON.stringify({
        skillGap: skillGapResponse.data,
        roadmap: roadmapResponse.data,
        targetRole,
        currentSkills: skillsArray,
      }));

      // Navigate to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error analyzing career path:', err);
      const errorMessage = err.response?.data?.error || 'Failed to analyze career path. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-blue-600">CodeAtRandom</span> AI
          </h1>
          <p className="text-gray-600 mt-1">Your Personal Career Path Analyzer</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Career Path
            </h2>
            <p className="text-lg text-gray-600">
              Analyze skill gaps, get personalized roadmaps, and stay updated with tech news
            </p>
          </div>

          {/* Form Card */}
          <div className="card">
            <form onSubmit={handleSubmit}>
              {/* Target Role */}
              <div className="mb-6">
                <label htmlFor="targetRole" className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Role *
                </label>
                <select
                  id="targetRole"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select a role...</option>
                  {availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Choose your target career role
                </p>
              </div>

              {/* Current Skills */}
              <div className="mb-6">
                <label htmlFor="currentSkills" className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Skills *
                </label>
                <textarea
                  id="currentSkills"
                  value={currentSkills}
                  onChange={(e) => setCurrentSkills(e.target.value)}
                  placeholder="e.g., HTML, CSS, JavaScript, React, Git"
                  rows={4}
                  className="input-field resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your skills separated by commas
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  '🚀 Analyze My Career Path'
                )}
              </button>
            </form>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Skill Gap Analysis</h3>
              <p className="text-sm text-gray-600">
                Identify missing skills for your target role
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Career Roadmap</h3>
              <p className="text-sm text-gray-600">
                Get a personalized learning path
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl mb-3">📰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Tech News</h3>
              <p className="text-sm text-gray-600">
                Stay updated with latest tech stories
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container py-6 text-center text-gray-600 text-sm">
          <p>© 2025 CodeAtRandom AI. Built with Next.js & TypeScript.</p>
        </div>
      </footer>
    </div>
  );
}

