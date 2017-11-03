# dirmods
Node.js command line utility to make modifications to a number of directories in Linux

## Installation
```
npm install -g @j154004/dirmods
```

## Usage
`@j154004/dirmods <command> [options]`

## Commands
### `config`
Change the git configuration in a directory.

Run within the directory you wish to change the local git configuration for. Otherwise use the `-d` flag to set configuration for all sub directories.

Prints all the directories that have had their configuration altered.

|Option|Alias|Description|Required|
|---|---|---|---|
|`name`|`-n`|Your user name for the remote git repository|Yes|
|`directory`|`-d`|Change the configuration in all child directories|No|

#### Example
`@j154004/dirmods config --name="elementsweb"`

## License
[BSD license](/LICENSE) Copyright (c) elementsweb
