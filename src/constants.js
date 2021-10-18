"use strict";

const UserCommand = {
  HELP: `--help`,
  GENERATE: `--generate`,
  VERSION: `--version`,
  SERVER: `--server`,
};

const DEFAULT_COMMAND = UserCommand.HELP;

const USER_ARGV_INDEX = 2;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  UserCommand,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
};
