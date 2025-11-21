import { SkillGapResponse } from '@/types';

interface SkillGapCardProps {
  skillGap: SkillGapResponse;
}

export default function SkillGapCard({ skillGap }: SkillGapCardProps) {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">📊 Skill Gap Analysis</h3>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">{skillGap.matchPercentage}%</div>
          <div className="text-xs text-gray-600">Match</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
            style={{ width: `${skillGap.matchPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Matched Skills */}
      {skillGap.matchedSkills.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-green-600 mr-2">✓</span>
            Matched Skills ({skillGap.matchedSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillGap.matchedSkills.map((skill, index) => (
              <span key={index} className="badge-success">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {skillGap.missingSkills.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="text-yellow-600 mr-2">⚠</span>
            Missing Skills ({skillGap.missingSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {skillGap.missingSkills.map((skill, index) => (
              <span key={index} className="badge-warning">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">💡</span>
          Recommendations
        </h4>
        <ul className="space-y-2">
          {skillGap.recommendations.map((recommendation, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Learning Order */}
      {skillGap.suggestedLearningOrder.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2">📚</span>
            Suggested Learning Order
          </h4>
          <ol className="space-y-2">
            {skillGap.suggestedLearningOrder.map((skill, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="font-semibold text-blue-600 mr-2 min-w-[24px]">
                  {index + 1}.
                </span>
                <span>{skill}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

