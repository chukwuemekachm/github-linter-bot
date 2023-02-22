

import { Probot, ProbotOctokit, Context } from 'probot';

function bot(app: Probot) {
  app.on('pull_request.opened', async (context: Context) => {
    console.log()
//     const response = context.octokit.rest.pulls.listFiles({
//   owner,
//   repo,
//   pull_number,
// });
//     const issueComment = context.octokit.pulls.createReview({
//       body: 'Thanks for opening this issue!',
//       owner: context.payload
//     });
//     await context.octokit.issues.createComment(issueComment);
  });
  
  // app.on('pull_request.reopened', async (context: Context) => {
  //   const issueComment = context.octokit.pulls.createReview({
  //     body: 'Thanks for opening this issue!',
  //   });
  //   await context.octokit.issues.createComment(issueComment);
  // });
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

export default bot;
