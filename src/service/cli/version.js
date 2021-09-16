"use strict";

const chalk = require(`chalk`);

const packageJsonFile = require(`../../../package.json`);
const {UserCommand} = require(`../../constants`);

module.exports = {
  name: UserCommand.VERSION,
  run() {
    const version = packageJsonFile.version;
    console.info(chalk.blue(version));
  },
};
