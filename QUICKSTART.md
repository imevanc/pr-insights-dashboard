# 🎯 Quick Start Guide

Get up and running with PR Insights Dashboard in 5 minutes!

## ⚡ Fast Track Setup

### Prerequisites Check
```bash
# 1. Check Node.js (need 18+)
node --version

# 2. Check if Copilot CLI is installed
copilot --version
# or
gh copilot --version

# 3. Check GitHub authentication
gh auth status
```

### First Time Setup
```bash
# If Copilot CLI is not installed:
npm install -g @github/copilot-cli
# OR
gh extension install github/gh-copilot

# Authenticate
gh auth login
```

## 🚀 Installation

```bash
# 1. Navigate to the project
cd pr-insights-dashboard

# 2. Install dependencies (takes ~30 seconds)
npm install

# 3. Verify installation
npm run build
```

## 🎬 Your First Analysis

### Option 1: Auto-Detect (If in a Git Repo)
```bash
# Just run it - will detect your current repo
npm start
```

### Option 2: Specify Repository
```bash
# Analyze any public repository
npm start -- --repo github/copilot-sdk

# Try these popular repos:
npm start -- --repo facebook/react
npm start -- --repo microsoft/vscode
npm start -- --repo vercel/next.js
```

### Option 3: Quick Analysis (Non-Interactive)
```bash
# Run and exit (perfect for demos)
npm start -- --repo github/copilot-sdk --non-interactive
```

## 🎨 What You'll See

### 1. Initial Analysis
The tool will automatically:
- Fetch all open PRs
- Analyze age distribution
- Identify oldest PRs
- Generate visualizations
- Provide insights and recommendations

### 2. Generated Files (in `./output/`)
- `pr-age-distribution.png` - Bar chart of PR ages
- `pr-labels-distribution.png` - Pie chart of labels
- `pr-authors.png` - Top contributors chart
- Additional files based on analysis

### 3. Interactive Mode
After initial analysis, you can ask:
```
You: Show me PRs by author
You: What are the most active contributors?
You: Analyze PR review times
You: Show trends over the last month
You: Which PRs need urgent attention?
```

Type `exit` when done.

## 🎯 Demo Scenarios

### 5-Minute Product Demo
```bash
# 1. Show automatic detection (in a git repo)
npm start
# Let it run the initial analysis

# 2. Ask a follow-up question
You: Show me the 10 oldest PRs

# 3. Exit
You: exit
```

### 10-Minute Deep Dive
```bash
# 1. Start with a well-known repo
npm start -- --repo facebook/react

# 2. Interactive questions:
You: Show me PRs by author
You: Analyze review patterns
You: What trends do you see?
You: Which PRs should be prioritized?

# 3. Show the generated files
open output/  # macOS
explorer output\  # Windows
xdg-open output/  # Linux
```

### Advanced Analysis Demo
```bash
# Run comprehensive analysis
tsx examples/advanced-analysis.ts --repo microsoft/vscode

# This generates:
# - velocity-trends.png
# - review-patterns.png
# - contributor-insights.png
# - label-analysis.png
# - size-complexity.png
# - summary-report.md
```

## 🐛 Troubleshooting

### "copilot: command not found"
```bash
# Install Copilot CLI
npm install -g @github/copilot-cli
# or
gh extension install github/gh-copilot
```

### "Authentication required"
```bash
# Login to GitHub
gh auth login
# Follow the prompts
```

### "Permission denied" or rate limiting
```bash
# Refresh authentication
gh auth refresh -s read:org
```

### Python/matplotlib errors
Don't worry! The tool will automatically install required Python packages when needed.

## 📚 Next Steps

### Explore Features
```bash
# View all options
npm start -- --help

# Try different repositories
npm start -- --repo vercel/next.js

# Save to custom location
npm start -- --repo github/copilot-sdk --output ./my-reports
```

### Advanced Usage
```bash
# Run advanced analysis
tsx examples/advanced-analysis.ts --repo facebook/react

# Specific analyses only
tsx examples/advanced-analysis.ts --repo microsoft/vscode --analysis velocity-trends,review-patterns
```

### Automation
See `.github/workflows/pr-analysis.yml` for automated weekly reports using GitHub Actions.

## 💡 Tips for Best Results

1. **Choose active repositories** - Repos with many PRs show better insights
2. **Ask specific questions** - "Show review patterns" vs "Tell me about reviews"
3. **Explore interactively** - Follow-up questions often reveal interesting patterns
4. **Save your outputs** - Charts make great slides for team meetings

## 🎥 Screen Recording Tips

For recording demos:
1. Use a clean terminal (clear history)
2. Increase font size for visibility
3. Add `--non-interactive` for predictable timing
4. Pre-install dependencies to avoid delays
5. Have a few follow-up questions ready

## 📞 Need Help?

- **Documentation**: See README.md for detailed info
- **Examples**: Check the `examples/` folder
- **Issues**: Found a bug? Please report it!
- **Questions**: See CONTRIBUTING.md

---

**Ready? Let's go!** 🚀

```bash
npm start -- --repo github/copilot-sdk
```