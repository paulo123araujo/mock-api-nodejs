import { api } from './api';
import { env } from './env';
import logger from './infra/logger/pino';

export function apiProvider(): void {
  try {
    logger.info('⏳ Setting up and initialize api');

    api.listen(env.PORT);

    logger.info(`✅ Api listening on port ${env.PORT}`);
  } catch (error) {
    logger.error(error, 'Error on init API', 'API');
  }
}

export async function server(): Promise<void> {
  logger.info('⏳ Setting up and initialize server');

  apiProvider();

  logger.info('✅ Server already is up!');
}

server().catch(error =>
  logger.error(
    error,
    '🛑 Error during server inicialization. Description:\n',
    'API',
  ),
);
