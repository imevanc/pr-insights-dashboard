# Contributing to PR Insights Dashboard

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pr-insights-dashboard.git
   cd pr-insights-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Copilot CLI** (if not already installed)
   ```bash
   npm install -g @github/copilot-cli
   # or
   gh extension install github/gh-copilot
   ```

4. **Verify setup**
   ```bash
   npm run lint
   npm run build
   ```

## 🛠️ Development Workflow

### Running Locally

```bash
# Development mode with auto-reload
npm run dev

# Run with specific repository
npm start -- --repo github/copilot-sdk

# Run tests (when available)
npm test
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Format code
npm run format
```

### TypeScript Guidelines

- Use strict TypeScript settings
- Provide type annotations for function parameters and return types
- Avoid `any` types when possible
- Use interfaces for object shapes

Example:
```typescript
interface RepositoryInfo {
  owner: string;
  name: string;
  fullName: string;
}

function parseRepository(repo: string): RepositoryInfo {
  const [owner, name] = repo.split("/");
  return { owner, name, fullName: repo };
}
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Add support for analyzing closed PRs
- [ ] Implement caching for API responses
- [ ] Add export to PDF/HTML formats
- [ ] Create web dashboard interface
- [ ] Add unit tests and integration tests

### Medium Priority
- [ ] Support for comparing multiple repositories
- [ ] Team-based analytics
- [ ] Integration with Slack/Discord
- [ ] Custom visualization templates
- [ ] Support for GitHub Enterprise

### Low Priority
- [ ] Dark mode for generated HTML reports
- [ ] Email report delivery
- [ ] Historical data tracking
- [ ] Benchmark comparisons

## 📝 Submitting Changes

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
    - Write clean, documented code
    - Follow existing code style
    - Add comments for complex logic
    - Update README if adding features

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   # Test manually with different repositories
   npm start -- --repo github/copilot-sdk
   ```

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add support for closed PRs analysis"
   ```

   Use conventional commits:
    - `feat:` - New feature
    - `fix:` - Bug fix
    - `docs:` - Documentation changes
    - `style:` - Code style changes
    - `refactor:` - Code refactoring
    - `test:` - Adding tests
    - `chore:` - Maintenance tasks

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub

### PR Guidelines

- **Title**: Clear, descriptive title
- **Description**: Explain what changes were made and why
- **Screenshots**: Include for UI changes or new visualizations
- **Tests**: Add tests for new functionality (when test framework is available)
- **Documentation**: Update README and inline comments

## 🐛 Reporting Bugs

### Before Reporting
- Check existing issues
- Verify it's reproducible
- Collect relevant information

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Run command: `npm start -- --repo ...`
2. Enter query: "..."
3. See error

**Expected behavior**
What you expected to happen.

**Actual behavior**
What actually happened.

**Environment:**
- OS: [e.g., macOS 14.0, Ubuntu 22.04]
- Node.js version: [e.g., 20.10.0]
- Copilot CLI version: [output of `copilot --version`]

**Additional context**
Any other relevant information.
```

## 💡 Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature is already requested
2. Create a detailed issue explaining:
    - Use case and problem it solves
    - Proposed solution
    - Alternative approaches considered
    - Potential impact on existing features

## 🧪 Testing

### Manual Testing Checklist

Before submitting, test with:
- [ ] Auto-detected repository
- [ ] Explicitly specified repository
- [ ] Large repositories (>100 PRs)
- [ ] Repositories with no open PRs
- [ ] Private repositories (if applicable)
- [ ] Interactive mode
- [ ] Non-interactive mode
- [ ] Custom output directory

### Example Test Commands
```bash
# Small repo
npm start -- --repo github/hello-world

# Large repo
npm start -- --repo facebook/react --non-interactive

# Different output location
npm start -- --repo microsoft/vscode --output /tmp/test
```

## 📚 Documentation

### Documentation Standards

- **Code Comments**: Explain "why", not "what"
- **JSDoc**: Use for functions and classes
- **README**: Keep up to date with features
- **Examples**: Provide real-world examples

Example:
```typescript
/**
 * Analyzes pull request age distribution and generates visualizations.
 * 
 * @param repo - Repository in format "owner/name"
 * @param options - Analysis options
 * @returns Promise resolving to analysis results
 * 
 * @example
 * ```typescript
 * const results = await analyzePRs("github/copilot-sdk", {
 *   outputDir: "./output"
 * });
 * ```
*/
async function analyzePRs(
repo: string,
options: AnalysisOptions
): Promise<AnalysisResults> {
// Implementation
}
```

## 🤝 Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others in discussions
- Share knowledge and learnings
- Celebrate contributions

## 📞 Getting Help

- **Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Discord/Slack**: (Add if available)
- **Email**: (Add if available)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PR Insights Dashboard! 🎉