import { RoadmapResponse } from '@/types';

interface RoadmapCardProps {
  roadmap: RoadmapResponse;
}

export default function RoadmapCard({ roadmap }: RoadmapCardProps) {
  return (
    <div className="card h-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">🗺️ Career Roadmap</h3>
        <p className="text-sm text-gray-600">
          Total Duration: <span className="font-semibold text-blue-600">{roadmap.totalDuration}</span>
        </p>
      </div>

      {/* Roadmap Phases */}
      <div className="space-y-6">
        {roadmap.roadmap.map((phase, index) => (
          <div key={index} className="relative">
            {/* Phase Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-5 border-2 border-blue-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    {phase.phase}
                  </h4>
                  <p className="text-sm text-blue-600 font-semibold">
                    ⏱️ {phase.duration}
                  </p>
                </div>
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{phase.description}</p>

              {/* Skills to Learn */}
              <div>
                <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Skills to Learn:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {phase.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="badge-info text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector Line (except for last phase) */}
            {index < roadmap.roadmap.length - 1 && (
              <div className="flex justify-center my-3">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Success Message */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800 flex items-start">
          <span className="mr-2 text-lg">🎯</span>
          <span>
            <strong>You're on the right path!</strong> Follow this roadmap systematically, 
            build projects along the way, and you'll reach your goal of becoming a {roadmap.targetRole}.
          </span>
        </p>
      </div>
    </div>
  );
}

