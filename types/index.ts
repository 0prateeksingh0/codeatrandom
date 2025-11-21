// API Request/Response Types

export interface SkillGapRequest {
  targetRole: string;
  currentSkills: string[];
}

export interface SkillGapResponse {
  targetRole: string;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  suggestedLearningOrder: string[];
  matchPercentage: number;
}

export interface RoadmapRequest {
  targetRole: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  skills: string[];
  description: string;
}

export interface RoadmapResponse {
  targetRole: string;
  roadmap: RoadmapPhase[];
  totalDuration: string;
}

export interface HackerNewsStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  time: number;
  type: string;
  by: string;
}

export interface CareerData {
  skillGap: SkillGapResponse | null;
  roadmap: RoadmapResponse | null;
}

