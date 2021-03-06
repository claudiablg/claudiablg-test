import { AppError, ERROR_TYPE } from '@newrade/core-common';
import chalk from 'chalk';
import debug from 'debug';
import * as dotenv from 'dotenv';
import * as t from 'io-ts';
import path from 'path';
import { CommonEnvType } from './common-env';
import { PathReporter } from './reporter';

const log = debug('newrade:env');

/**
 * Utility function to load the .env files in the monorepository.
 *
 * By default it loads the package's .env file (e.g. in `packages/<package-name>/.env`) and the parent .env file
 * (`<root>/.env`) which contains variables for the whole repository.
 *
 * It also validates .env files according to a io-ts schema.
 *
 * @see https://github.com/motdotla/dotenv#readme
 * @see https://github.com/gcanti/io-ts/blob/master/index.md
 */
export function loadDotEnv<ENV = CommonEnvType>({
  schema,
  dotEnvPath,
  dotEnvRootPath = path.resolve(__dirname, '..', '..', '..', '.env'),
  packageName,
}: {
  schema: t.IntersectionC<any>;
  dotEnvPath: string;
  dotEnvRootPath?: string;
  packageName: string;
}) {
  const logEnv = log.extend(packageName.replace('@newrade/', ''));
  const logEnvError = logEnv.extend('error');
  logEnv(`loading .env files`);

  /**
   * Loads project .env file
   */
  dotenv.config({
    path: dotEnvPath,
  });
  /**
   * Loads repo root .env file
   */
  dotenv.config({
    path: dotEnvRootPath,
  });

  logEnv(`validating .env files...`);

  /**
   * Validate if .env satisfies the passed schema with io-ts
   */
  const dotEnvConfig = schema;
  const result = dotEnvConfig.decode(process.env);
  const report = PathReporter.report(result);

  if (report && report.length && !report[0].includes('No errors')) {
    report.map((reason) => {
      logEnvError(`${reason}`);
    });

    throw new AppError({
      name: ERROR_TYPE.APP_ERROR,
      message: `Invalid dot env`,
    });
  }

  logEnv(`.env files is ${chalk.green('valid')}`);

  return process.env as any as ENV;
}
