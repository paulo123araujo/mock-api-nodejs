import { DIContainer } from 'rsdi';
import { PinoLogger } from '@/infra/logger/pino';
import { Logger } from '@/application/logger';

export function configureInfraServiceDI() {
  return new DIContainer().add(Logger.name, () => new PinoLogger());
}
