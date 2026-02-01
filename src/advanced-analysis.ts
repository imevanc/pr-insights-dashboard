#!/usr/bin/env node
/**
 * Advanced PR Analysis Example
 *
 * This script demonstrates advanced usage of the PR Insights Dashboard,
 * including custom analysis prompts and automated report generation.
 */

import { CopilotClient } from "@github/copilot-sdk";
import * as fs from "fs";
import * as path from "path";

interface AnalysisConfig {
    repo: string;
    outputDir: string;
    analyses: string[];
}

const ADVANCED_ANALYSES = [
    {
        name: "velocity-trends",
        prompt: `Analyze PR velocity trends over the last 6 months:
    - Average time to merge
    - PR throughput (PRs merged per week)
    - Identify any velocity changes
    - Create a line chart showing trends
    Save as velocity-trends.png`,
    },
    {
        name: "review-patterns",
        prompt: `Analyze PR review patterns:
    - Average number of reviews per PR
    - Time to first review
    - Review approval rates
    - Top reviewers
    - Create visualizations for review metrics
    Save as review-patterns.png`,
    },
    {
        name: "contributor-insights",
        prompt: `Analyze contributor patterns:
    - Distribution of PRs by author
    - New vs. returning contributors
    - Contribution frequency
    - Create a bar chart of top 10 contributors
    Save as contributor-insights.png`,
    },
    {
        name: "label-analysis",
        prompt: `Analyze PR labels and categorization:
    - Most common labels
    - Label combinations
    - Average time to merge by label type
    - Create a pie chart and bar chart
    Save as label-analysis.png`,
    },
    {
        name: "size-complexity",
        prompt: `Analyze PR size and complexity:
    - Distribution of PR sizes (lines changed)
    - Files modified per PR
    - Correlation between size and merge time
    - Create scatter plot and histogram
    Save as size-complexity.png`,
    },
];

async function runAdvancedAnalysis(config: AnalysisConfig) {
    console.log("🚀 Advanced PR Analysis Tool\n");
    console.log(`📦 Repository: ${config.repo}`);
    console.log(`📁 Output: ${config.outputDir}\n`);

    // Ensure output directory exists
    if (!fs.existsSync(config.outputDir)) {
        fs.mkdirSync(config.outputDir, { recursive: true });
    }

    const client = new CopilotClient({ logLevel: "error" });

    try {
        await client.start();
        console.log("✅ Connected to GitHub Copilot\n");

        const [owner, repoName] = config.repo.split("/");

        const session = await client.createSession({
            model: "gpt-5",
            systemMessage: {
                content: `
You are an expert GitHub analytics consultant. Analyze ${owner}/${repoName} with focus on:
- Data-driven insights
- Professional visualizations using matplotlib/seaborn
- Statistical analysis (mean, median, percentiles)
- Trend identification
- Actionable recommendations

Save all outputs to: ${config.outputDir}
Use descriptive filenames and high-quality chart settings (dpi=300, figsize=(12,8)).
`,
            },
        });

        // Event handling
        session.on((event) => {
            if (event.type === "assistant.message") {
                console.log(`\n📊 ${event.data.content}\n`);
            } else if (event.type === "tool.execution_start") {
                console.log(`  ⚙️  ${event.data.toolName}`);
            }
        });

        // Run each analysis
        for (const analysis of ADVANCED_ANALYSES) {
            if (
                config.analyses.length === 0 ||
                config.analyses.includes(analysis.name)
            ) {
                console.log(`\n${"=".repeat(70)}`);
                console.log(`🔍 Running: ${analysis.name}`);
                console.log("=".repeat(70));

                await session.sendAndWait({ prompt: analysis.prompt });

                // Small delay between analyses
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        // Generate summary report
        console.log(`\n${"=".repeat(70)}`);
        console.log("📝 Generating Summary Report");
        console.log("=".repeat(70));

        const summaryPrompt = `
Based on all the analyses performed, create a comprehensive Markdown summary report:
- Executive summary (3-4 key findings)
- Detailed insights from each analysis
- Trends and patterns observed
- Top 3 recommendations for improving PR workflow
- List of all generated visualizations

Save as summary-report.md in the output directory.
`;

        await session.sendAndWait({ prompt: summaryPrompt });

        console.log("\n✅ Analysis complete!");
        console.log(`📂 Reports available in: ${config.outputDir}\n`);

        // List generated files
        const files = fs.readdirSync(config.outputDir);
        if (files.length > 0) {
            console.log("Generated files:");
            files.forEach((file) => {
                const fullPath = path.join(config.outputDir, file);
                const stats = fs.statSync(fullPath);
                const size = (stats.size / 1024).toFixed(2);
                console.log(`  📄 ${file} (${size} KB)`);
            });
        }

        await session.destroy();
        await client.stop();
    } catch (error) {
        console.error("\n❌ Error:", error);
        await client.stop();
        process.exit(1);
    }
}

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const config: AnalysisConfig = {
        repo: "",
        outputDir: "./advanced-output",
        analyses: [],
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === "--repo" && i + 1 < args.length) {
            config.repo = args[++i];
        } else if (arg === "--output" && i + 1 < args.length) {
            config.outputDir = args[++i];
        } else if (arg === "--analysis" && i + 1 < args.length) {
            config.analyses = args[++i].split(",");
        } else if (arg === "--help" || arg === "-h") {
            console.log(`
Advanced PR Analysis Tool

Usage:
  tsx examples/advanced-analysis.ts --repo <owner/repo> [options]

Options:
  --repo <owner/repo>        GitHub repository (required)
  --output <dir>             Output directory (default: ./advanced-output)
  --analysis <name,name>     Specific analyses to run (comma-separated)
                            Available: velocity-trends, review-patterns,
                                      contributor-insights, label-analysis,
                                      size-complexity
                            Default: all analyses

Examples:
  tsx examples/advanced-analysis.ts --repo github/copilot-sdk
  tsx examples/advanced-analysis.ts --repo facebook/react --analysis velocity-trends,review-patterns
  tsx examples/advanced-analysis.ts --repo microsoft/vscode --output ./vscode-reports
      `);
            process.exit(0);
        }
    }

    if (!config.repo) {
        console.error("❌ Error: --repo is required\n");
        console.log('Use --help for usage information');
        process.exit(1);
    }

    return config;
}

// Run the analysis
const config = parseArgs();
runAdvancedAnalysis(config).catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});