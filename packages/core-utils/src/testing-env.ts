import * as t from 'io-ts';
import { TextBoolean } from './boolean-env';
import { Protocol } from './protocol-env';

/**
 * Typed representation of the .env file for test setup (jest, puppeteer...).
 */
export const TestingEnv = t.partial({
  /**
   * Testing
   */
  TEST_PROTOCOL: Protocol,
  TEST_HOST: t.string,
  TEST_PORT: t.string,
  TEST_IGNORE_SSL_ERROR: TextBoolean,
  TEST_CHROME_HEADLESS: TextBoolean,
  TEST_VIEW_HEIGHT: t.string,
  TEST_VIEW_WIDTH: t.string,
});

export type TestingEnvType = t.TypeOf<typeof TestingEnv>;
