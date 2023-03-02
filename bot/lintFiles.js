// eslint-disable-next-line import/no-extraneous-dependencies
import { ESLint } from 'eslint';
import { approveChangesReview, requestChangesReview } from './pullRequest';

// eslint-disable-next-line import/prefer-default-export
export async function lintFiles(app, context) {
  try {
    const eslint = new ESLint();
    const { repository, pull_request: pullNumber } = context.payload;

    const results = await eslint.lintFiles(['./**/*.js']);

    if (results.length) {
      requestChangesReview(
        context,
        repository.owner.login,
        repository.name,
        pullNumber.number,
        results,
      );
    } else {
      approveChangesReview(
        context,
        repository.owner.login,
        repository.name,
        pullNumber.number,
      );
    }
  } catch (error) {
    process.exitCode = 1;
    app.log.error('Linting errors: ');
    app.log.error(error);
  }
}
