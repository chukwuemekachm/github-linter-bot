// eslint-disable-next-line import/no-extraneous-dependencies
import { ESLint } from 'eslint';
import {
  approveChangesReview,
  fetchAllPullRequestFiles,
  requestChangesReview,
} from './pullRequest';

// eslint-disable-next-line import/prefer-default-export
export async function lintFiles(app, context) {
  try {
    const eslint = new ESLint();
    const { repository, pull_request: pullRequest } = context.payload;

    const pullRequestFiles = await fetchAllPullRequestFiles(
      context,
      repository.owner.login,
      repository.name,
      pullRequest.number,
    );
    const results = await eslint.lintFiles(['./**/*.js']);

    const lintResultMap = new Map();
    results.forEach((r) => lintResultMap.set(r.filePath, r));

    const lintResults = [];
    pullRequestFiles.forEach((file) => {
      const fileLintErrors = lintResultMap.get(file.filename);
      if (fileLintErrors && fileLintErrors.filePath) {
        lintResults.push(fileLintErrors);
      }
    });

    if (results.length) {
      await requestChangesReview(
        context,
        repository.owner.login,
        repository.name,
        pullRequest.number,
        lintResults,
      );
      process.exitCode = 1;
    } else {
      await approveChangesReview(
        context,
        repository.owner.login,
        repository.name,
        pullRequest.number,
      );
      process.exitCode = 0;
    }
  } catch (error) {
    process.exitCode = 1;
    app.log.error('Linting errors: ');
    app.log.error(error);
  }
}
