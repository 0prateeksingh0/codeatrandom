// Role requirements
export const ROLE_SKILLS: { [key: string]: string[] } = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
  "Backend Developer": ["Java", "Spring Boot", "SQL", "APIs", "Git"],
  "Data Analyst": ["Excel", "SQL", "Python", "Dashboards", "Statistics"],
  "Full Stack Developer": ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "Git", "APIs"],
  "DevOps Engineer": ["Linux", "Docker", "Kubernetes", "CI/CD", "AWS", "Git", "Python"],
  "Mobile Developer": ["React Native", "JavaScript", "APIs", "Git", "Mobile UI/UX"],
  "Data Scientist": ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization", "NumPy", "Pandas"],
  "UI/UX Designer": ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems", "HTML", "CSS"]
};

// Normalize role name
export function normalizeRoleName(role: string): string {
  const normalized = role.trim().toLowerCase();
  
  for (const key of Object.keys(ROLE_SKILLS)) {
    if (key.toLowerCase() === normalized) {
      return key;
    }
  }
  
  return role.trim();
}

export function getRequiredSkills(role: string): string[] | null {
  const normalizedRole = normalizeRoleName(role);
  return ROLE_SKILLS[normalizedRole] || null;
}

