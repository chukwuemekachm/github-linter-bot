import { ESLint } from 'eslint';
import { run } from '@probot/adapter-github-actions';

async function fetchPullRequestFiles(
  context,
  owner,
  repo,
  pull_number,
  page,
  per_page,
) {
  const { data } = await context.octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number,
    per_page,
    page,
  });

  return data;
}

async function fetchAllPullRequestFiles(context, owner, repo, pull_number) {
  const MAX_FILES = 3000;
  const PER_PAGE = 1;
  let page_number = 1;
  let last_page_count = 0;
  const pullRequestFiles = [];

  do {
    const files = await fetchPullRequestFiles(
      context,
      owner,
      repo,
      pull_number,
      page_number,
      PER_PAGE,
    );

    last_page_count = files.length;
    pullRequestFiles.push(...files);
    page_number++;
  } while (last_page_count === PER_PAGE);

  return pullRequestFiles;
}

async function requestChangesReview(
  context,
  owner,
  repo,
  pull_number,
  results,
) {
  const body = 'This is close to perfect! Please address the suggested inline change.';

  const files = results.map((result) => ({
    path: result.filePath,
    messages: result.messages,
    errorCount: result.errorCount,
  }));
  const comments = files.reduce((acc, curr) => {
    if (curr.errorCount) {
      const messages = curr.messages.map((message) => ({
        path: curr.path,
        line: message.line,
        position: message.column,
        body: `<${String(message.ruleId).toUpperCase()}> - ${message.message}`,
      }));
      acc.push(...messages);
      return acc;
    }
    return acc;
  }, []);
  await context.octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number,
    event: 'REQUEST_CHANGES',
    body,
    comments,
  });
}

async function approveChangesReview(context, owner, repo, pull_number) {
  await context.octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number,
    event: 'APPROVE',
  });

  return true;
}

async function lintFiles(app, context) {
  try {
    // 1. Create an instance.
    const eslint = new ESLint();
    const { repository, pull_request } = context.payload;

    // 2. Lint files.
    const results = await eslint.lintFiles(['./**/*.js']);

    // 3. Output it.
    app.log.info('Linting result: ');
    if (results.length) {
      requestChangesReview(
        context,
        repository.owner.login,
        repository.name,
        pull_request.number,
        results,
      );
    } else {
      approveChangesReview(
        context,
        repository.owner.login,
        repository.name,
        pull_request.number,
      );
    }
  } catch (error) {
    process.exitCode = 1;
    app.log.error('Linting errors: ');
    app.log.error(error);
  }
}

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
const bot = (app) => {
  // Your code here
  app.log.info('Yay, the app was loaded!');
  app.on(
    ['pull_request.opened', 'pull_request.synchronize'],
    async (context) => {
      const { repository, pull_request } = context.payload;
      const files = await fetchAllPullRequestFiles(
        context,
        repository.owner.login,
        repository.name,
        pull_request.number,
      );
      app.log.info('pull request files: ');
      app.log.info(files.length);

      app.log.info('Executing lint files');
      lintFiles(app, context);
    },
  );
};

run(bot);
