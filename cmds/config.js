const fs = require('fs');
const path = require('path');
const junk = require('junk');
const git = require('simple-git');

const updateLocalConfig = (name, cwd) => {
  const email = `${name}@users.noreply.github.com`;

  console.log(`Setting config in ${cwd}`);

  git(cwd)
    .init()
    .addConfig('user.name', name)
    .addConfig('user.email', email);
};

exports.command = 'config';
exports.desc = 'Change the git configuration in a directory';
exports.builder = (yargs) => {
  return yargs
    .option('name', {
      alias: 'n',
      describe: 'Your user name for the remote git repository',
    })
    .option('directory', {
      alias: 'd',
      describe: 'Change the configuration in all child directories',
    })
    .demandOption(['name'], 'Please provide a name');
};
exports.handler = (argv) => {
  if (argv.directory) {
    fs.readdir(process.cwd(), (err, files) => {
      if (err) throw err;

      const visibleFiles = files.filter(junk.not);

      const directories = visibleFiles.filter((file) => {
        return fs.statSync(path.join(process.cwd(), file)).isDirectory();
      });

      directories.forEach((dir) => {
        updateLocalConfig(argv.name, path.join(process.cwd(), dir));
      });
    });
  } else {
    updateLocalConfig(argv.name, process.cwd());
  }
};
