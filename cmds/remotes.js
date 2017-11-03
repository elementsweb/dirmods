const fs = require('fs');
const os = require('os');
const path = require('path');
const process = require('child_process');
const chalk = require('chalk');
const git = require('simple-git/promise');

exports.command = 'remotes';
exports.desc = 'Perform operations against remote repositories';
exports.builder = (yargs) => {
  return yargs
    .option('host', {
      alias: 'h',
      describe: 'Hostname to clone repositories from',
      default: 'bitbucket.org',
    })
    .option('user', {
      alias: 'u',
      describe: 'User the repository belongs to',
    })
    .option('repos', {
      alias: 'r',
      describe: 'Repositories to clone, mutate and commit code to',
    })
    .option('codemod', {
      alias: 'cm',
      describe: 'Codemod to run against files in directory',
    })
    .option('codemod-libary', {
      alias: 'cl',
      describe: 'Codemod library to use',
    })
    .option('codemod-args', {
      alias: 'ca',
      requiresArg: 'codemod',
      describe: 'Arguments to pass to the codemod function',
    })
    .demandOption(['user', 'repos'], 'Please provide a name')
    .check((argv, opts) => {
      if (argv.ca && !argv.cm) {
        throw new Error(
          chalk.blue('You must supply --codemod value to use --codemod-args')
        );
      }

      if (argv.cm && !argv.cl) {
        throw new Error(
          chalk.blue('You must supply --codemod-library value to use --codemod')
        );
      }

      return true;
    })
    .array('repos')
    .array('codemod-args');
};
exports.handler = (argv) => {
  fs.mkdtemp(path.join(os.tmpdir(), 'dirmods-'), (err, folder) => {
    if (err) throw err;

    argv.repos.map((repoName) => {
      const url = `git@${argv.host}:${argv.user}/${repoName}.git`;

      console.log(`Cloning ${repoName} into ${folder}`);

      git(folder).clone(url)
        .then(() => {
          const repoPath = path.join(folder, repoName);

          process.spawn('ls', {
            cwd: repoPath,
            stdio: ['inherit', 'inherit', 'inherit'],
          });
        })
        .catch((error) => {
          throw error;
        });
    });
  });
};
