function transformFilePath(path, repo) {
  return String(path).replace(`/home/runner/work/${repo}/${repo}/`, '');
}

export async function requestChangesReview(
  context,
  owner,
  repo,
  pullNumber,
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
  await context.octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number: pullNumber,
    event: 'REQUEST_CHANGES',
    body,
    comments,
  });
}

export async function approveChangesReview(context, owner, repo, pullNumber) {
  await context.octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number: pullNumber,
    event: 'APPROVE',
  });

  return true;
}
