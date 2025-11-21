# API Documentation

Complete documentation for all API endpoints in CodeAtRandom AI.

## Base URL

```
Local: http://localhost:3000
Production: https://your-domain.vercel.app
```

## Table of Contents

1. [Skill Gap Analyzer](#1-skill-gap-analyzer)
2. [Career Roadmap Generator](#2-career-roadmap-generator)
3. [HackerNews Integration](#3-hackernews-integration)

---

## 1. Skill Gap Analyzer

Analyzes the gap between your current skills and target role requirements.

### Endpoint

```
POST /api/skill-gap
```

### Request Headers

```
Content-Type: application/json
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| targetRole | string | Yes | The career role you're targeting |
| currentSkills | string[] | Yes | Array of your current skills |

### Request Example

```json
{
  "targetRole": "Backend Developer",
  "currentSkills": ["Java", "Git", "SQL"]
}
```

### Response (200 OK)

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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| targetRole | string | Normalized target role name |
| matchedSkills | string[] | Skills you already possess |
| missingSkills | string[] | Skills you need to learn |
| matchPercentage | number | Percentage of skills matched (0-100) |
| recommendations | string[] | Personalized recommendations |
| suggestedLearningOrder | string[] | Prioritized list of skills to learn |

### Error Responses

**400 Bad Request**
```json
{
  "error": "Target role is required and must be a string."
}
```

**404 Not Found**
```json
{
  "error": "Role \"XYZ\" not found. Available roles: Frontend Developer, Backend Developer, ..."
}
```

**405 Method Not Allowed**
```json
{
  "error": "Method not allowed. Use POST."
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

### CURL Example

```bash
curl -X POST http://localhost:3000/api/skill-gap \
  -H "Content-Type: application/json" \
  -d '{
    "targetRole": "Frontend Developer",
    "currentSkills": ["HTML", "CSS", "JavaScript"]
  }'
```

### JavaScript/Axios Example

```javascript
import axios from 'axios';

const response = await axios.post('/api/skill-gap', {
  targetRole: 'Frontend Developer',
  currentSkills: ['HTML', 'CSS', 'JavaScript']
});

console.log(response.data);
```

---

## 2. Career Roadmap Generator

Generates a 3-phase learning roadmap for your target role.

### Endpoint

```
POST /api/roadmap
```

### Request Headers

```
Content-Type: application/json
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| targetRole | string | Yes | The career role you're targeting |

### Request Example

```json
{
  "targetRole": "Backend Developer"
}
```

### Response (200 OK)

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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| targetRole | string | Normalized target role name |
| totalDuration | string | Total time to complete all phases |
| roadmap | RoadmapPhase[] | Array of learning phases |
| roadmap[].phase | string | Phase name |
| roadmap[].duration | string | Estimated duration for this phase |
| roadmap[].skills | string[] | Skills to learn in this phase |
| roadmap[].description | string | Detailed phase description |

### Error Responses

**400 Bad Request**
```json
{
  "error": "Target role is required and must be a string."
}
```

**404 Not Found**
```json
{
  "error": "Role \"XYZ\" not found. Available roles: Frontend Developer, Backend Developer, ..."
}
```

**405 Method Not Allowed**
```json
{
  "error": "Method not allowed. Use POST."
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

### CURL Example

```bash
curl -X POST http://localhost:3000/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{
    "targetRole": "Backend Developer"
  }'
```

### JavaScript/Axios Example

```javascript
import axios from 'axios';

const response = await axios.post('/api/roadmap', {
  targetRole: 'Backend Developer'
});

console.log(response.data);
```

---

## 3. HackerNews Integration

Fetches the top 5 latest tech stories from HackerNews.

### Endpoint

```
GET /api/hackernews
```

### Request Headers

None required

### Query Parameters

None

### Response (200 OK)

```json
[
  {
    "id": 38234567,
    "title": "Show HN: I built a tool for X",
    "url": "https://example.com/article",
    "score": 245,
    "time": 1700000000,
    "type": "story",
    "by": "username"
  },
  {
    "id": 38234568,
    "title": "Another Tech Story",
    "url": "https://example.com/article2",
    "score": 180,
    "time": 1700000100,
    "type": "story",
    "by": "another_user"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| id | number | HackerNews story ID |
| title | string | Story title |
| url | string | External URL or HN discussion link |
| score | number | Story score (upvotes) |
| time | number | UNIX timestamp |
| type | string | Story type (usually "story") |
| by | string | Author username |

### Error Responses

**405 Method Not Allowed**
```json
{
  "error": "Method not allowed. Use GET."
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to fetch HackerNews stories. Please try again later."
}
```

### CURL Example

```bash
curl http://localhost:3000/api/hackernews
```

### JavaScript/Axios Example

```javascript
import axios from 'axios';

const response = await axios.get('/api/hackernews');
console.log(response.data);
```

### JavaScript/Fetch Example

```javascript
const response = await fetch('/api/hackernews');
const stories = await response.json();
console.log(stories);
```

---

## Supported Roles

The following roles are supported by both Skill Gap and Roadmap APIs:

1. **Frontend Developer**
2. **Backend Developer**
3. **Data Analyst**
4. **Full Stack Developer**
5. **DevOps Engineer**
6. **Mobile Developer**
7. **Data Scientist**
8. **UI/UX Designer**

## Rate Limiting

Currently, there are no rate limits on the API. However:
- HackerNews API may rate-limit requests
- Consider implementing caching for production use

## CORS

CORS is handled automatically by Next.js API routes. All origins are allowed by default in development.

## Authentication

Currently, no authentication is required. All endpoints are public.

## Error Handling

All endpoints follow consistent error handling:
- **400**: Bad Request - Invalid input
- **404**: Not Found - Resource not found
- **405**: Method Not Allowed - Wrong HTTP method
- **500**: Internal Server Error - Server-side error

All errors return JSON with an `error` field containing the error message.

## Best Practices

1. **Always validate input** on the client side before calling APIs
2. **Handle errors gracefully** and show user-friendly messages
3. **Use loading states** for better UX
4. **Cache responses** when possible (especially HackerNews)
5. **Normalize role names** for case-insensitive matching

## Testing

You can test all endpoints using:
- **Postman**: Import the requests and test interactively
- **CURL**: Use the examples provided above
- **Browser**: For GET requests, use the browser directly
- **API Testing Tools**: Thunder Client, Insomnia, etc.

---

## Need Help?

If you encounter issues:
1. Check the error message in the response
2. Verify your request format matches the examples
3. Check the console for detailed error logs
4. Refer to the main README.md for setup instructions

**API Version**: 1.0.0  
**Last Updated**: November 2025

