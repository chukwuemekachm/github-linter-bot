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
      app.log.info('pull request files: ', files);
      app.log.info(files);

      (async function main() {
        // 1. Create an instance.
        const eslint = new ESLint();

        // 2. Lint files.
        const results = await eslint.lintFiles(['lib/**/*.js']);

        // 3. Format the results.
        const formatter = await eslint.loadFormatter('stylish');
        const resultText = formatter.format(results);

        // 4. Output it.
        console.log('Linting result: ', resultText);
      }()).catch((error) => {
        process.exitCode = 1;
        console.error('Linting errors: ', error);
      });
    },
  );
};

module.exports = bot;

run(bot);
