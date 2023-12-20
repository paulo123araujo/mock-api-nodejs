import { configureInfraDI } from '../infra';
import { configureApplicationServiceDI } from './services';

export function configureApplicationDI() {
  return configureInfraDI().extend(configureApplicationServiceDI);
}
