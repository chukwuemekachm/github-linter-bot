module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(104);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 104:
/***/ (function(module) {

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  // app.log.info("Yay, the app was loaded!");
  app.on(
    ["pull_request.opened", "pull_request.synchronize"],
    async (context) => {
      const { repository, pull_request } = context.payload;
      const files = await fetchAllPullRequestFiles(
        context,
        repository.owner.login,
        repository.name,
        pull_request.number
      );

      console.log("response ----------------", files);
    }
  );
};

async function fetchPullRequestFiles(
  context,
  owner,
  repo,
  pull_number,
  page,
  per_page
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
      PER_PAGE
    );
 
    last_page_count = files.length;
    pullRequestFiles.push(...files);
    page_number++;
  } while (last_page_count == PER_PAGE);

  return pullRequestFiles;
}


/***/ })

/******/ });