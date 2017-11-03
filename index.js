const yargs = require('yargs');

yargs
  .commandDir('cmds')
  .argv;

// use current directory by default
// directory as positional argument
// flag to go into all directories in the positional argument
