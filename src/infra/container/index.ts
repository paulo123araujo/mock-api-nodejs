import { configureInfraDI } from './infra';

export function configureDI() {
  return configureInfraDI();
}

export const container = configureDI();

export default configureDI;
