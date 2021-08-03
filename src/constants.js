"use strict";

const UserCommand = {
  HELP: `--help`,
  GENERATE: `--generate`,
  VERSION: `--version`,
};

const DEFAULT_COMMAND = UserCommand.HELP;

const USER_ARGV_INDEX = 2;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports = {
  UserCommand,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
};
