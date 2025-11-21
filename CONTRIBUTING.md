# Contributing to CodeAtRandom AI

Thank you for your interest in contributing! This is an assignment project, but improvements are welcome.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/codeatrandom.git
   cd codeatrandom
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Workflow

1. **Make your changes**
2. **Test locally**
   ```bash
   npm run dev
   ```
3. **Build to ensure no errors**
   ```bash
   npm run build
   ```
4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

## 📝 Commit Convention

Use conventional commit messages:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: Add new role support for Mobile Developer
fix: Correct skill matching algorithm
docs: Update README with deployment instructions
```

## 🎯 Areas for Improvement

### High Priority
- [ ] Add unit tests for API endpoints
- [ ] Add integration tests for frontend
- [ ] Improve error handling with better user feedback
- [ ] Add loading skeletons for better UX

### Medium Priority
- [ ] Add user authentication (optional)
- [ ] Persist data to database (MongoDB/PostgreSQL)
- [ ] Add more predefined roles
- [ ] Dynamic AI-generated roadmaps (integrate OpenAI)

### Low Priority
- [ ] Dark mode toggle
- [ ] Export results as PDF
- [ ] Share results via link
- [ ] Multi-language support

## 🧪 Testing

Currently, the project doesn't have automated tests. If you'd like to add testing:

1. **Install testing libraries**
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. **Create tests in `__tests__` directory**

3. **Run tests**
   ```bash
   npm test
   ```

## 📦 Adding New Features

### Adding a New Role

1. Update `data/roleSkills.ts`:
   ```typescript
   "New Role": ["Skill1", "Skill2", "Skill3"]
   ```

2. Update `pages/api/roadmap.ts` to add roadmap for the role

3. Update `pages/index.tsx` to add the role to dropdown

### Adding a New API Endpoint

1. Create file in `pages/api/your-endpoint.ts`
2. Follow existing patterns for error handling
3. Add TypeScript types in `types/index.ts`
4. Document the endpoint in README.md

## 🎨 Style Guide

- Use TypeScript for all new files
- Follow ESLint rules (run `npm run lint`)
- Use Tailwind CSS for styling (avoid custom CSS)
- Keep components small and focused
- Add comments for complex logic

## ❓ Questions?

If you have questions, feel free to:
- Open an issue
- Start a discussion
- Contact the maintainer

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉

