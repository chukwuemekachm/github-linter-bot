import { transformFilePath } from './constants';

async function fetchPullRequestFiles(
  context,
  owner,
  repo,
  pullNumber,
  page,
  perPage,
) {
  const { data } = await context.octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: pullNumber,
    per_page: perPage,
    page,
  });

  return data;
}

export async function fetchAllPullRequestFiles(context, owner, repo, pullNumber) {
  const PER_PAGE = 1;
  let pageNumber = 1;
  let lastPageCount = 0;
  const pullRequestFiles = [];

  do {
    const files = await fetchPullRequestFiles(
      context,
      owner,
      repo,
      pullNumber,
      pageNumber,
      PER_PAGE,
    );

    lastPageCount = files.length;
    pullRequestFiles.push(...files);
    pageNumber++;
  } while (lastPageCount === PER_PAGE);

  return pullRequestFiles;
}

export async function requestChangesReviewBatch(
  context,
  owner,
  repo,
  pullNumber,
  comments,
) {
  if (comments.length > 20) {
    await context.octokit.rest.pulls.createReview({
      owner,
      repo,
      pull_number: pullNumber,
      event: 'COMMENT',
      body: '',
      comments: comments.slice(0, 20),
    });
    return requestChangesReviewBatch(context, owner, repo, pullNumber, comments.slice(20));
  }
  await context.octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number: pullNumber,
    event: 'COMMENT',
    body: '',
    comments,
  });
  return 'done';
}

export async function requestChangesReview(
  context,
  owner,
  repo,
  pullNumber,
  results,
) {
  const files = results.map((result) => ({
    path: result.filePath,
    messages: result.messages,
    errorCount: result.errorCount,
  }));
  const comments = files.reduce((acc, curr) => {
    if (curr.errorCount) {
      const messages = curr.messages.map((message) => ({
        path: transformFilePath(curr.path, repo),
        line: message.line,
        side: 'RIGHT',
        body: message.ruleId
          ? `<${message.ruleId}> - ${message.message}`
          : message.message,
      }));
      messages.forEach((m) => {
        acc.push(m);
      });
      return acc;
    }
    return acc;
  }, []);
  await requestChangesReviewBatch(context, owner, repo, pullNumber, comments);
  return 'done';
}

export async function approveChangesReview(context, owner, repo, pullNumber) {
  await context.octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number: pullNumber,
    event: 'APPROVE',
  });

  return 'done';
}
