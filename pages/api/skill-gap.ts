import type { NextApiRequest, NextApiResponse } from 'next';
import { SkillGapRequest, SkillGapResponse } from '@/types';
import { getRequiredSkills, normalizeRoleName } from '@/data/roleSkills';

// Analyzes skill gaps between current and required skills
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SkillGapResponse | { error: string }>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { targetRole, currentSkills }: SkillGapRequest = req.body;

    if (!targetRole || typeof targetRole !== 'string') {
      return res.status(400).json({ error: 'Target role is required and must be a string.' });
    }

    if (!Array.isArray(currentSkills)) {
      return res.status(400).json({ error: 'Current skills must be an array.' });
    }

    const normalizedRole = normalizeRoleName(targetRole);
    const requiredSkills = getRequiredSkills(targetRole);

    if (!requiredSkills) {
      return res.status(404).json({ 
        error: `Role "${targetRole}" not found. Available roles: Frontend Developer, Backend Developer, Data Analyst, Full Stack Developer, DevOps Engineer, Mobile Developer, Data Scientist, UI/UX Designer` 
      });
    }

    const normalizedCurrentSkills = currentSkills.map(skill => skill.trim());
    const normalizedRequiredSkills = requiredSkills.map(skill => skill.trim());

    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    normalizedRequiredSkills.forEach(requiredSkill => {
      const isMatched = normalizedCurrentSkills.some(
        currentSkill => currentSkill.toLowerCase() === requiredSkill.toLowerCase()
      );

      if (isMatched) {
        matchedSkills.push(requiredSkill);
      } else {
        missingSkills.push(requiredSkill);
      }
    });

    const matchPercentage = Math.round(
      (matchedSkills.length / requiredSkills.length) * 100
    );

    const recommendations = generateRecommendations(
      normalizedRole,
      matchedSkills,
      missingSkills,
      matchPercentage
    );

    const suggestedLearningOrder = generateLearningOrder(
      normalizedRole,
      missingSkills
    );

    const response: SkillGapResponse = {
      targetRole: normalizedRole,
      matchedSkills,
      missingSkills,
      recommendations,
      suggestedLearningOrder,
      matchPercentage,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error in skill-gap API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Generate personalized recommendations
function generateRecommendations(
  role: string,
  matched: string[],
  missing: string[],
  percentage: number
): string[] {
  const recommendations: string[] = [];

  if (percentage >= 80) {
    recommendations.push(
      `Great job! You have ${percentage}% of the required skills for ${role}.`
    );
    recommendations.push(
      'Focus on the remaining skills to become fully qualified.'
    );
    recommendations.push(
      'Consider working on real-world projects to strengthen your expertise.'
    );
  } else if (percentage >= 50) {
    recommendations.push(
      `You're halfway there with ${percentage}% skill match for ${role}.`
    );
    recommendations.push(
      'Focus on learning the missing skills in the suggested order.'
    );
    recommendations.push(
      'Practice your existing skills while learning new ones.'
    );
  } else if (percentage >= 20) {
    recommendations.push(
      `You have ${percentage}% of required skills. There's a learning curve ahead.`
    );
    recommendations.push(
      'Start with foundational skills before moving to advanced topics.'
    );
    recommendations.push(
      'Consider online courses, tutorials, and hands-on practice.'
    );
  } else {
    recommendations.push(
      `Starting fresh? ${percentage}% match means this is a new direction.`
    );
    recommendations.push(
      'Follow the learning roadmap systematically from Phase 1.'
    );
    recommendations.push(
      'Join communities and find mentors in this field.'
    );
  }

  if (missing.length > 0) {
    recommendations.push(
      `Priority skills to learn: ${missing.slice(0, 3).join(', ')}`
    );
  }

  return recommendations;
}

// Generate suggested learning order
function generateLearningOrder(role: string, missingSkills: string[]): string[] {
  const learningPriority: { [key: string]: string[] } = {
    'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'Git', 'React'],
    'Backend Developer': ['Git', 'Java', 'SQL', 'APIs', 'Spring Boot'],
    'Data Analyst': ['Excel', 'SQL', 'Statistics', 'Python', 'Dashboards'],
    'Full Stack Developer': ['HTML', 'CSS', 'JavaScript', 'Git', 'Node.js', 'SQL', 'React', 'APIs'],
    'DevOps Engineer': ['Linux', 'Git', 'Python', 'Docker', 'CI/CD', 'Kubernetes', 'AWS'],
    'Mobile Developer': ['JavaScript', 'Git', 'Mobile UI/UX', 'APIs', 'React Native'],
    'Data Scientist': ['Python', 'Statistics', 'SQL', 'NumPy', 'Pandas', 'Machine Learning', 'Data Visualization'],
    'UI/UX Designer': ['User Research', 'Figma', 'Adobe XD', 'Prototyping', 'HTML', 'CSS', 'Design Systems']
  };

  const rolePriority = learningPriority[role] || missingSkills;

  const orderedSkills = rolePriority.filter(skill =>
    missingSkills.some(missing => 
      missing.toLowerCase() === skill.toLowerCase()
    )
  );

  const remainingSkills = missingSkills.filter(skill =>
    !orderedSkills.some(ordered => 
      ordered.toLowerCase() === skill.toLowerCase()
    )
  );

  return [...orderedSkills, ...remainingSkills];
}

