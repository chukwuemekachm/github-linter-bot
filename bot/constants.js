const { LOCAL_MACHINE } = process.env;

export const DIRECTORY_PATH = '/Users/chukwuemekachima/Documents/play/github-bot/';

export function getDirPath(repo) {
  return LOCAL_MACHINE ? `/Users/chukwuemekachima/Documents/play/${repo}/` : `/home/runner/work/${repo}/${repo}/`;
}

export function transformFilePath(path, repo) {
  return String(path).replace(getDirPath(repo), '');
}
