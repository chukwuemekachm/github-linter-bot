import { lintFiles } from './lintFiles';

const bot = (app) => {
  app.on(
    ['pull_request.opened', 'pull_request.synchronize'],
    async (context) => {
      lintFiles(app, context);
    },
  );
};

export default bot;
