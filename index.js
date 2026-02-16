// Define exports for the GitHub Action
const { Octokit } = require("@octokit/rest"); // This is used for interacting with the GitHub API
const Giphy = require("giphy-api"); // This is used for interacting with the Giphy API to fetch GIFs based on search terms
const core = require("@actions/core");  // This is used for getting inputs and setting outputs in the GitHub Action
const github = require("@actions/github"); // This is used for getting the context of the GitHub event that triggered the action

async function run() {
  try {
    // Get inputs from workflow
    const githubToken = core.getInput('github-token');
    const giphyApiKey = core.getInput('giphy-api-key');

    // Initialize Octokit and Giphy
    const octokit = new Octokit({ auth: githubToken });
    const giphy = Giphy(giphyApiKey);

    // Get context info
    const context = github.context;
    const { owner, repo } = context.repo;
    const issue_number = context.payload.pull_request?.number;

    if (!issue_number) {
      core.setFailed('No pull request found in context.');
      return;
    }

    // Get a random "thank you" GIF
    const prComment = await giphy.random('thank you');

    // Compose comment body
    const gifUrl = prComment.data.images?.downsized?.url || '';
    const body = `### PR #${issue_number}\n### Thank you for the contribution!\n![Giphy](${gifUrl})`;

    // Post comment on PR
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });

    // Set output
    core.setOutput('comment-url', gifUrl);
    console.log(`Giphy GIF comment added successfully! Comment URL: ${gifUrl}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
