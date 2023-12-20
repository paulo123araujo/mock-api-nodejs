import { configureInfraServiceDI } from './services';

export function configureInfraDI() {
  return configureInfraServiceDI();
}

export type InfraDI = ReturnType<typeof configureInfraDI>;
