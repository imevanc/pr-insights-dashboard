# 🔍 PR Insights Dashboard

An AI-powered tool for analyzing GitHub pull requests using the **GitHub Copilot SDK**. Get instant insights and visualizations about your repository's PRs.

## What It Does

Automatically analyzes pull requests and generates:
- **Visual charts** showing PR age distribution
- **Insights** about contributors and patterns
- **Recommendations** for improving workflow
- **Interactive Q&A** - ask follow-up questions in natural language

The GitHub Copilot SDK handles everything - fetching data, generating charts, and providing insights.

## 🚀 Quick Start

### Prerequisites

**Install Copilot CLI:**
```bash
npm install -g @github/copilot-cli
```

**Authenticate:**
```bash
gh auth login
```

### Run

```bash
npm install
npm start -- --repo github/copilot-sdk
```

## 📖 Usage

### Auto-Detect Repository
If you're in a git repository with a GitHub remote:
```bash
npm start
```

### Specify Repository
```bash
npm start -- --repo facebook/react
```

### Quick Demo
```bash
npm run demo
```

### Non-Interactive Mode
Run analysis once and exit:
```bash
npm start -- --repo microsoft/vscode --non-interactive
```

## 💬 Interactive Conversation

After the initial analysis, you can ask follow-up questions:

```
You: Who are the most active contributors?
You: Which PRs have been open the longest?
You: What patterns do you see?
You: Any recommendations for improving our workflow?
```

Type `exit` to quit.

## 🎯 How It Works

```typescript
// 1. Create Copilot client
const client = new CopilotClient();
await client.start();

// 2. Create a session
const session = await client.createSession({
  model: "gpt-4o",
  systemMessage: {
    content: "You are analyzing GitHub pull requests..."
  }
});

// 3. Listen for responses
session.on((event) => {
  if (event.type === "assistant.message") {
    console.log(event.data.content);
  }
});

// 4. Send requests - responses come via events
session.send({
  prompt: "Please analyze the open pull requests"
});
```

Copilot automatically:
- Fetches PR data from GitHub
- Analyzes patterns and trends
- Provides actionable insights
- Answers follow-up questions

## 📊 Example Session

```
🚀 PR Insights Dashboard

📦 Auto-detected: github/copilot-sdk
📊 Analyzing: github/copilot-sdk

✅ Connected to Copilot

🔍 Analyzing pull requests...

I've analyzed the repository and created a visualization. Here's what I found:

The repository has 34 open pull requests with the following distribution:
- 0-7 days old: 15 PRs (44%)
- 7-30 days old: 12 PRs (35%)
- 30-90 days old: 5 PRs (15%)
- 90+ days old: 2 PRs (6%)

I've saved a chart as 'pr-age-distribution.png' showing this distribution.

Top Contributors:
- Copilot AI: 8 PRs
- john0isaac: 4 PRs
- reachanihere: 3 PRs

Recommendations:
- Focus review efforts on the 5 PRs over 30 days old
- Consider pairing reviewers for faster turnaround

💡 Ask follow-up questions (or type 'exit')

You: Create a pie chart showing PRs by label

Creating a pie chart of PR labels...
Saved as 'pr-labels.png'

You: exit

👋 Goodbye!
```

## 🎓 Customization Ideas

### Different Analysis Focus

Modify the `systemMessage` to focus on different aspects:

```typescript
systemMessage: {
    content: `Analyze PRs with focus on:
  - Review velocity and bottlenecks
  - New contributor onboarding
  - Breaking changes and dependencies
  - Documentation coverage`
}
```

### Predefined Queries

Add common queries as CLI options:
```bash
npm start -- --repo owner/repo --analysis reviews
npm start -- --repo owner/repo --analysis contributors
npm start -- --repo owner/repo --analysis velocity
```

### Multi-Repository Analysis

Compare multiple repositories:
```typescript
const repos = ['facebook/react', 'vercel/next.js', 'angular/angular'];
for (const repo of repos) {
    // Analyze each and compare
}
```

### Automated Reports

Run daily/weekly with cron or GitHub Actions:
```yaml
- name: PR Analysis
  run: npm start -- --repo ${{ github.repository }} --non-interactive
```

## 🔧 Project Structure

```
pr-dashboard/
├── src/
│   └── index.ts       # Main application
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
└── README.md          # This file
```

## 🐛 Troubleshooting

**"copilot: command not found"**
```bash
npm install -g @github/copilot-cli
```

**"Authentication required"**
```bash
gh auth login
```

**Want to analyze private repos?**
Make sure you're authenticated with appropriate permissions.

## 📚 Learn More

- [GitHub Copilot SDK](https://github.com/github/copilot-sdk)
- [Getting Started Guide](https://github.com/github/copilot-sdk/blob/main/docs/getting-started.md)
- [Original PR Visualization Example](https://github.com/github/copilot-sdk/blob/main/cookbook/nodejs/pr-visualization.md)

## 🤝 Contributing

Ideas for enhancements:
- Add predefined analysis templates
- Support for issues analysis
- Team performance metrics
- Historical trend tracking
- Export conversation history
- Slack/Discord integration

## 📄 License

MIT

---

**Built with GitHub Copilot SDK** - Pure AI-powered insights! 🤖