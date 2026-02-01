#!/usr/bin/env node
import { CopilotClient } from "@github/copilot-sdk";
import * as readline from "readline";
import { execSync } from "child_process";

/**
 * PR Insights Dashboard - AI-Powered GitHub PR Analysis
 *
 * Simple conversational interface to analyze GitHub pull requests.
 * Just ask questions and get instant AI-powered insights.
 */

interface CliOptions {
    repo?: string;
    interactive?: boolean;
}

function parseArgs(): CliOptions {
    const args = process.argv.slice(2);
    const options: CliOptions = { interactive: true };

    for (let i = 0; i < args.length; i++) {
        if (args[i] === "--repo" && i + 1 < args.length) {
            options.repo = args[++i];
        } else if (args[i] === "--non-interactive") {
            options.interactive = false;
        } else if (args[i] === "--help" || args[i] === "-h") {
            console.log(`
🔍 PR Insights Dashboard - AI-Powered GitHub PR Analysis

Usage: npm start [options]

Options:
  --repo <owner/name>     Specify repository (e.g., github/copilot-sdk)
  --non-interactive       Exit after initial analysis
  --help, -h              Show this help

Examples:
  npm start
  npm start -- --repo facebook/react
  npm start -- --repo microsoft/vscode --non-interactive
`);
            process.exit(0);
        }
    }

    return options;
}

function detectRepository(): string | null {
    try {
        const remote = execSync("git remote get-url origin", {
            encoding: "utf-8",
            stdio: ["pipe", "pipe", "pipe"],
        }).trim();
        const match = remote.match(/github\.com[:/]([^/]+\/[^/.]+)/);
        return match ? match[1].replace(/\.git$/, "") : null;
    } catch {
        return null;
    }
}

async function promptForRepository(rl: readline.Interface): Promise<string> {
    return new Promise((resolve) => {
        rl.question("Enter GitHub repository (owner/repo): ", (answer) => {
            resolve(answer.trim());
        });
    });
}

async function main() {
    console.log("🚀 PR Insights Dashboard\n");

    const options = parseArgs();
    let repo = options.repo;

    // Auto-detect repository
    if (!repo) {
        const detected = detectRepository();
        if (detected) {
            console.log(`📦 Auto-detected: ${detected}`);
            repo = detected;
        }
    }

    // Prompt if still no repo
    if (!repo) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        repo = await promptForRepository(rl);
        rl.close();

        if (!repo || !repo.includes("/")) {
            console.error("❌ Invalid format. Expected: owner/repo");
            process.exit(1);
        }
    }

    const [owner, repoName] = repo.split("/");
    console.log(`\n📊 Analyzing: ${owner}/${repoName}\n`);

    const client = new CopilotClient({ logLevel: "error" });

    try {
        await client.start();

        const session = await client.createSession({
            systemMessage: {
                content: `You are analyzing pull requests for the GitHub repository: ${owner}/${repoName}

The current working directory is: ${process.cwd()}

Instructions:
- Use the GitHub MCP Server tools to fetch PR data
- Use your file and code execution tools to generate charts
- Save any generated images to the current working directory
- Analyze PR age distribution, contributors, and patterns
- Be concise in your responses
- Provide actionable recommendations`,
            },
        });

        console.log("✅ Connected to Copilot\n");

        // Display responses
        session.on((event) => {
            if (event.type === "assistant.message") {
                console.log(`\n${event.data.content}\n`);
            }
        });

        // Send initial analysis request
        console.log("🔍 Analyzing pull requests...\n");
        session.send({
            prompt: "Please analyze the open pull requests. Create a chart showing the PR age distribution (how long they've been open) and save it to the current directory. Also provide insights about contributors and any patterns you notice.",
        });

        // Interactive mode
        if (options.interactive) {
            console.log("\n" + "=".repeat(60));
            console.log("💡 Ask follow-up questions (or type 'exit')");
            console.log("=".repeat(60));
            console.log("\nTry asking:");
            console.log('  • "Create a pie chart showing PRs by author"');
            console.log('  • "Which PRs have been open the longest?"');
            console.log('  • "Show me a timeline of when PRs were created"');
            console.log('  • "Generate a chart comparing this month vs last month"\n');

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            const askQuestion = () => {
                rl.question("You: ", async (input) => {
                    const trimmed = input.trim();

                    if (trimmed.toLowerCase() === "exit" || trimmed.toLowerCase() === "quit") {
                        console.log("\n👋 Goodbye!\n");
                        rl.close();
                        await session.destroy();
                        await client.stop();
                        process.exit(0);
                    }

                    if (trimmed) {
                        session.send({ prompt: trimmed });
                    }

                    askQuestion();
                });
            };

            askQuestion();
        } else {
            console.log("\n✅ Analysis complete!\n");
            await session.destroy();
            await client.stop();
            process.exit(0);
        }
    } catch (error) {
        console.error("\n❌ Error:", error);
        await client.stop();
        process.exit(1);
    }
}

main().catch(console.error);